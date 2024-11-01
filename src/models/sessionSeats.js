import MongoDbModel from '../libs/mongodb/model.js';

export default class SessionSeatsModel extends MongoDbModel {
	static collectionName = 'sessionSeats';

	#projectionFields = {
		id: '$_id',
		_id: 0,
		row: 1,
		session_id: 1,
		number: 1,
		is_reserved: 1
	};

	getByIdPublic(id) {
		return super.getById(id, this.#projectionFields);
	}

	async list() {
		const query = this.collection
			.find({})
			.project(this.#projectionFields)
			.toArray();

		return query;
	}
}
