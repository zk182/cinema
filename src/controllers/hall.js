import MasterController from './master.js';
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
}

export default new HallController();
