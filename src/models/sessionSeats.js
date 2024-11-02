import MongoDbModel from '../libs/mongodb/model.js';

export default class SessionSeatsModel extends MongoDbModel {
	static collectionName = 'sessionSeats';

	#projectionFields = {
		id: '$_id',
		_id: 0,
		row: 1,
		session_id: 1,
		seat_id: 1,
		number: 1,
		is_reserved: 1
	};

	getByIdPublic(id) {
		return super.getById(id, this.#projectionFields);
	}

	async list() {
		return this.collection.find({}).project(this.#projectionFields).toArray();
	}

	async getBySessionId(sessionId) {
		return this.collection
			.find({ session_id: sessionId })
			.project(this.#projectionFields)
			.toArray();
	}
}
