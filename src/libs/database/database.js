import knex from 'knex';

import logger from '../logger.js';

import { defaultServer } from './config/index.js';
import { convertFieldsToCamel, toSnakeCase } from './helper.js';

const {
	CONNECTION_POOL_LIMIT,
	CUSTOM_KNEX_QUERY_LOG,
	CUSTOM_KNEX_QUERY_LOG_INCLUDE_BINDINGS
} = process.env;

export default class Database {
	constructor(opts) {
		this.connection = knex({
			client: 'pg',
			connection: {
				...(opts.connection || defaultServer.connection),
				multipleStatements: true
			},
			pool: {
				min: 0,
				max: Number(CONNECTION_POOL_LIMIT) || 10
			},
			postProcessResponse: this.postProcessResponse.bind(this),
			wrapIdentifier: this.wrapIdentifier.bind(this),
			responseType: 'extended'
		});

		if (CUSTOM_KNEX_QUERY_LOG === 'true') {
			this.connection.on('query', data => {
				const sqlStatement = data.sql
					.replace(/[\n\r]/g, ' ')
					.replace(/[\t]/g, '');

				const queryString =
					CUSTOM_KNEX_QUERY_LOG_INCLUDE_BINDINGS === 'true'
						? this.connection.raw(sqlStatement, data.bindings).toString()
						: sqlStatement;

				logger.info(queryString);
			});
		}
	}

	postProcessResponse(result) {
		if (Array.isArray(result)) {
			return this.convertRowKeys(result);
		}

		return convertFieldsToCamel(result);
	}

	wrapIdentifier(value, origImpl) {
		return origImpl(toSnakeCase(value));
	}

	/**
	 *	Convert all rows keys to camelCase from lower_dash
	 *	@param {array} The rows to convert
	 * 	@return {array} The modfied array
	 */

	convertRowKeys(rows) {
		if (!Array.isArray(rows)) {
			return rows;
		}

		if (Array.isArray(rows[0])) {
			rows[0] = rows[0].map(item => convertFieldsToCamel(item));
			return rows;
		}

		return rows.map(item => convertFieldsToCamel(item));
	}
}
