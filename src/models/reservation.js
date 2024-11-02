import MongoDbModel from '../libs/mongodb/model.js';

export default class ReservationModel extends MongoDbModel {
	static collectionName = 'reservations';

	#projectionFields = {
		id: '$_id',
		_id: 0,
		user_id: 1,
		session_id: 1,
		seats_id: 1,
		reservationDate: 1,
		status: 1
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
