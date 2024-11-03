import BaseModel from './base';

class SessionModel extends BaseModel {
	async getAll() {
		return this.get('/');
	}

	async getLayout(id) {
		return this.get(`/${id}/seats`);
	}

	async reserve(id, selectedSeats) {
		const body = { seatsId: selectedSeats };
		return this.post(`/${id}/seats/reserve`, { body });
	}
}

export default new SessionModel('/sessions');
