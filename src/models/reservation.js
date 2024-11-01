import MongoDbModel from '../libs/mongodb/model.js';

export default class ReservationModel extends MongoDbModel {
	static collectionName = 'reservations';

	#projectionFields = {
		id: '$_id',
		_id: 0,
		userId: 1,
		sessionId: 1,
		seatsId: 1,
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
