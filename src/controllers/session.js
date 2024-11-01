import MasterController from './master.js';
import SessionModel from '#src/models/session.js';

import { ResourceNotFound } from '#src/errors/index.js';

class SessionController extends MasterController {
	static Model = SessionModel;

	async getById(id, fields) {
		const session = await this.model.getById(id, fields);

		if (!session) {
			throw new ResourceNotFound('Session not found');
		}

		return session;
	}
}

export default new SessionController();
