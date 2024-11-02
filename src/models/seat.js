import MasterModel from './master.js';

export default class SeatModel extends MasterModel {
	static table = 'seats';

	async getByHallId(hallId) {
		return this.readQuery
			.select('seats.id', 'seats.row', 'seats.number')
			.where({ 'seats.hall_id': hallId });
	}
}
