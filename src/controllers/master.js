import { Conflict, ResourceNotFound } from '#src/errors/index.js';
import MasterModel from '#src/models/master.js';

class MasterController {
	constructor() {
		this.model = new this.constructor.Model();
	}

	list() {
		return this.model.list();
	}

	async getById(id) {
		const data = await this.model.getById(id);

		if (!data) {
			throw new ResourceNotFound('Resource not found');
		}

		return data;
	}

	async create(fields) {
		try {
			const { insertId } = await this.model.insert(fields);
			return insertId;
		} catch (error) {
			if (error.errno === MasterModel.DUP_KEY_ERRNO) {
				throw new Conflict('Resource already exists');
			}
			throw error;
		}
	}

	async upsert(...args) {
		return this.model.upsert(...args);
	}

	update(fields, id) {
		return this.updateById(fields, id);
	}

	async updateById(fields, id) {
		if (!id) {
			throw new Error('ID is required');
		}

		try {
			const update = await this.model.updateById(fields, id);

			if (update.matchedRows === 0) {
				throw new ResourceNotFound('Resource not found');
			}

			return update;
		} catch (error) {
			if (error.errno === MasterModel.DUP_KEY_ERRNO) {
				throw new Conflict('Resource already exists');
			}
			throw error;
		}
	}

	async delete(id) {
		const deleted = await this.model.deleteById(id);

		if (
			deleted?.affectedRows === 0 ||
			deleted?.deletedCount === 0 ||
			deleted === 0
		) {
			throw new ResourceNotFound('Resource not found');
		}

		return deleted;
	}
}

export default MasterController;
