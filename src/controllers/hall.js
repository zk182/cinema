import MasterController from './master.js';
import SeatController from './seat.js';
import HallModel from '#src/models/hall.js';

import { ResourceNotFound } from '#src/errors/index.js';

class HallController extends MasterController {
	static Model = HallModel;

	async getById(id, fields) {
		const hall = await this.model.getById(id, fields);

		if (!hall) {
			throw new ResourceNotFound('Hall not found');
		}

		return hall;
	}

	async getHallConfigByHallId(id) {
		const hall = await this.getById(id, 'seatConfiguration');

		if (!hall.seatConfiguration) {
			throw new ResourceNotFound(
				`No seat configuration found for hall: ${id}`
			);
		}

		const seats = await SeatController.getSeatsByHallId(id);

		return this.groupSeatsByRow(hall.seatConfiguration, seats);
	}

	groupSeatsByRow(hallConfig, seats) {
		const { rows } = hallConfig;
		const seatingChart = [];

		for (let row = 1; row <= rows; row++) {
			const rowSeats = seats
				.filter(seat => seat.row === row)
				.sort((a, b) => a.number - b.number)
				.map(seat => ({ seat_id: seat.id }));

			seatingChart.push(rowSeats);
		}

		return seatingChart;
	}
}

export default new HallController();
