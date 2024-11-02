import MasterController from './master.js';
import SessionSeatsModel from '#src/models/sessionSeats.js';

import { ResourceNotFound } from '#src/errors/index.js';

class SessionSeatsController extends MasterController {
	static Model = SessionSeatsModel;

	async getById(id, fields) {
		const sessionSeats = await this.model.getById(id, fields);

		if (!sessionSeats) {
			throw new ResourceNotFound('Session not found');
		}

		return sessionSeats;
	}

	async getBySessionId(sessionId) {
		const session = await this.model.getBySessionId(sessionId);

		if (!session) {
			throw new ResourceNotFound('Session not found');
		}

		return session;
	}
}

export default new SessionSeatsController();
