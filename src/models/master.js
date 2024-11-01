import { Readable } from 'node:stream';
import ms from 'ms';

import CacheManager from '#src/managers/cache.js';
import {
	connect,
	getRandomItem,
	replicaServers,
	toSnakeCase
} from '#src/libs/database/index.js';

const cache = CacheManager.memory('model', {
	maxAge: ms('3h')
});

class ModelIterator {
	constructor(builder, limit, single) {
		this.limit = Number(limit) || 10;
		this.builder = builder.limit(this.limit);
		this.offset = 0;
		this.single = single;
	}

	async *[Symbol.asyncIterator]() {
		while (true) {
			const rows = await this.builder.clone().offset(this.offset);

			if (!rows || !rows.length) {
				return;
			}

			if (this.single) {
				yield* rows;
			} else {
				yield rows;
			}

			this.offset += this.limit;
		}
	}
}

class NoOffsetIterator {
	constructor(builder, limit, maxIterations) {
		this.limit = Number(limit) || 10;
		this.builder = builder.limit(this.limit);
		this.maxIterations = maxIterations;
		this.iterations = 0;
	}

	async *[Symbol.asyncIterator]() {
		while (true) {
			const rows = await this.builder.clone();

			if (
				!rows ||
				!rows.length ||
				(this.maxIterations && this.iterations > this.maxIterations)
			) {
				return;
			}

			yield* rows;
			this.iterations++;
		}
	}
}

/**
 * @class  MasterModel
 * @classdesc Class for use the database.
 */
export default class MasterModel {
	static DUP_KEY_ERRNO = 1062;

	/**
	 * @param {object} opts
	 * @param {object} opts.connection
	 * @param {string} opts.connection.host
	 * @param {string} opts.connection.user
	 * @param {string} opts.connection.database
	 * @param {number} opts.connection.port
	 * @param {string} opts.connection.password
	 * @param {string} opts.connection.charset
	 * @param {string} opts.prefix
	 */
	constructor({ connection, prefix } = { prefix: '' }) {
		this.knex = connect({
			connection,
			prefix
		}).connection;

		// Register in the pool the db connections.
		this.replicaPool = replicaServers.map(
			server => connect(server).connection
		);
	}

	decorateKnex(knex) {
		knex.noOffsetIterator = (limit, maxLimit) =>
			new NoOffsetIterator(knex, limit, maxLimit);
		knex.iterator = (limit, single = true) =>
			new ModelIterator(knex, limit, single);
		knex.stream = limit => Readable.from(new ModelIterator(knex, limit));

		return knex;
	}

	/**
	 * Return a knex instance with table configured based on the static get table.
	 * @return {Object}
	 */
	get query() {
		return this.decorateKnex(this.knex(this.constructor.table));
	}

	/**
	 * Returns a knex instance with table configured from static, but using a READ-REPLICA server.
	 * @return {Object}
	 */
	get readQuery() {
		// Use the default server in case of empty pool.
		return this.decorateKnex(this.knexRead(this.constructor.table));
	}

	get knexRead() {
		return this.replicaPool.length > 0
			? getRandomItem(this.replicaPool)
			: this.knex;
	}

	from(table) {
		return this.decorateKnex(this.knex(table));
	}

	/**
	 * Update records by user field, use this when you know that table has a user field.
	 * @param {object} data
	 * @param {number} user
	 * @param {object | null} [trx]
	 * @returns
	 */
	updateByUser(data, user, trx) {
		if (!user) {
			throw new Error('User cannot be empty');
		}

		const query = this.query.update(data).where({ user });
		return !trx ? query : query.transacting(trx);
	}

	/**
	 * Get record by user field, use this when you know that table has a user field.
	 * @param {number} user
	 * @param {object} data
	 * @returns {Promise<object | null}
	 */
	getByUserId(userId) {
		return this.query.select().where({ user: userId }).first();
	}

	/**
	 * Get record by user and id fields, use this when you know that table have either a user and id field.
	 * @param {number} user
	 * @param {number} id
	 * @returns {Promise<object | null}
	 */
	getByUserAndId(user, id) {
		return this.query.select().where({ user, id }).first();
	}

	/**
	 * Performs an insert query
	 * @param {object | array<object>} fields - The fields that will be inserted
	 * @param {object} [tx] - Transaction object
	 * @param {boolean} ignore
	 */
	async insert(fields, tx, ignore = false) {
		fields = await this.cleanupFields(fields);

		let query = !tx
			? this.query.insert(fields)
			: this.query.insert(fields).transacting(tx);

		if (ignore) {
			query = query.onConflict().ignore();
		}

		const result = await query;

		return result[0];
	}

	updateById(fields, id, tx) {
		return !tx
			? this.query.update(fields).where({ id })
			: this.query.update(fields).where({ id }).transacting(tx);
	}

	getById(id, fields) {
		if (Array.isArray(id)) {
			return this.query.select(fields || '*').whereIn('id', id);
		}

		return this.query.first(fields || '*').where({ id });
	}

	/**
	 * Performs a raw query.
	 * @param {String} raw The raw query.
	 * @param {Array|Object} [placeholders] The placeholders.
	 * @return {Mixed}
	 */
	async raw(raw, placeholders) {
		const rawParsed = raw.replace('{{TABLE}}', this.constructor.table);

		const [rows] = await this.knex.raw(rawParsed, placeholders);

		return rows;
	}

	/**
	 * Performs a row count of the given query.
	 * @param {Object} The knex query object
	 * @param {boolean=false} Whether to use SQL_CALC_FOUND_ROWS or count().
	 * @return {Number}
	 */
	async getCount(query, calc = false, withHaving = false) {
		const countQuery = query.clone();

		if (!withHaving) {
			countQuery.clear('select');
		}

		countQuery.clear('order');
		countQuery.first();
		countQuery.offset(0);

		if (!calc) {
			const result = await countQuery.select(
				this.knex.raw('count(1) as total')
			);

			return result?.total ?? 0;
		}

		if (withHaving) {
			// eslint-disable-next-line
			const columns = countQuery._statements.find(
				item => item.grouping === 'columns'
			);
			countQuery.clear('select');
			countQuery.select(
				this.knex.raw('SQL_CALC_FOUND_ROWS ??', [columns.value])
			);
		} else {
			countQuery.select(this.knex.raw('SQL_CALC_FOUND_ROWS 1'));
		}

		const result = await this.transaction(async tx => {
			await countQuery.transacting(tx);
			const [[{ total }]] = await this.knexRead
				.raw('SELECT FOUND_ROWS() as total;')
				.transacting(tx);

			return total;
		}, this.knexRead);

		return result;
	}

	/*
	 *	Performs an upsert (update/insert)
	 *	@param {object} fields - The fields that will be inserted
	 *	@param {array} updateFields - The fields that must be updated
	 *	@return {Promise<Array>}
	 */
	async upsert(fields, updateFields, tx) {
		fields = await this.cleanupFields(fields);

		const keysToReduce = Object.keys(
			Array.isArray(fields) ? fields[0] : fields
		);

		const update = (updateFields || keysToReduce)
			.reduce((acum, field) => {
				const column = toSnakeCase(field);
				return acum.push(`${column} = VALUES(${column})`), acum; // eslint-disable-line
			}, [])
			.join(',\n');

		const insertSqlObject = this.query.insert(fields).toSQL();

		const query = this.knex.raw(
			`${insertSqlObject.sql} ON DUPLICATE KEY UPDATE ${update}`,
			insertSqlObject.bindings
		);

		return !tx ? query : query.transacting(tx);
	}

	/*
	 *	Cleanup non table fields
	 *	@param {object/array} fields - The object that will be cleaned. Non table fields will be removed
	 */
	async cleanupFields(fields) {
		const tableFields = await this.getFields();

		if (Array.isArray(fields))
			return fields.map(field => this._cleanupFields(field, tableFields));

		return this._cleanupFields(fields, tableFields);
	}

	/*
	 *	Cleanup non table fields
	 *	@param {object/array} fields - The object that will be cleaned. Non table fields will be removed
	 *	@param {object} tableFields - The database table columns
	 *	@private
	 */
	_cleanupFields(fields, tableFields) {
		return Object.entries(fields).reduce((acum, [field, value]) => {
			if (tableFields[field]) {
				acum[field] = value;
			}

			return acum;
		}, {});
	}

	/*
	 *	Get database fields from table
	 *	@param {string} [table=this.constructor.table] - The table where the fields will be retrieved from
	 */
	async getFields(table) {
		table = table || this.constructor.table;

		const cacheKey = `${table}-fields`;
		const fieldsCache = cache.get(cacheKey);

		if (fieldsCache) {
			return fieldsCache;
		}

		const promise = this.knex(table).columnInfo();
		cache.set(cacheKey, promise);

		try {
			const fields = await promise;
			cache.set(cacheKey, fields);
			return fields;
		} catch (e) {
			cache.del(cacheKey);
			throw e;
		}
	}

	transaction(transaction, knex = this.knex) {
		let before = () => {};

		const promise = new Promise((resolve, reject) => {
			process.nextTick(() => {
				knex
					.transaction(async tx => {
						try {
							const result = await transaction(tx);
							await before(result);
							await tx.commit(result);
						} catch (e) {
							await tx.rollback(e);
						}
					})
					.then(resolve)
					.catch(reject);
			});
		});

		promise.beforeCommit = fn => {
			before = fn;
			return promise;
		};

		return promise;
	}

	list() {
		return this.readQuery.select();
	}

	deleteById(id) {
		return this.query.delete().where({ id });
	}
}
