import moment from 'moment';
import { connect } from './index.js';
import { toId } from './helper.js';

export default class MongoDbModel {
	constructor() {
		this.client = connect();
	}

	get collection() {
		return this.client.collection(this.constructor.collectionName);
	}

	getById(_id, projection) {
		return this.collection.findOne(
			{
				_id: toId(_id)
			},
			{ projection }
		);
	}

	list() {
		return this.collection.find({}).toArray();
	}

	insert(fields) {
		const now = moment().unix();
		return this.collection.insertOne({
			...fields,
			createdAt: now,
			updatedAt: now
		});
	}

	upsert() {
		throw new Error('not implemented');
	}

	updateById(fields, _id) {
		return this.collection.updateOne(
			{ _id: toId(_id) },
			{ $set: { ...fields, updatedAt: moment().unix() } }
		);
	}

	rawUpdateById(update, _id) {
		return this.collection.updateOne({ _id: toId(_id) }, update);
	}

	unsetById(fields, _id) {
		return this.collection.updateOne(
			{ _id: toId(_id) },
			{
				$unset: this.parseUnsetFields(fields),
				$set: { updatedAt: moment().unix() }
			}
		);
	}

	deleteById(_id) {
		return this.collection.deleteOne({ _id: toId(_id) });
	}

	parseUnsetFields(fields) {
		return fields.reduce((acum, item) => {
			acum[item] = '';
			return acum;
		}, {});
	}
}
