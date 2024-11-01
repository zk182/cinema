import bcrypt from 'bcrypt';

import AuthController from './auth.js';
import MasterController from './master.js';
import UserModel from '#src/models/user.js';

import { Conflict, ResourceNotFound } from '#src/errors/index.js';

const SALT_ROUNDS = 10;

class UserController extends MasterController {
	static Model = UserModel;

	async getById(id, fields) {
		const user = await this.model.getById(id, fields);

		if (!user) {
			throw new ResourceNotFound('User not found');
		}

		delete user.password;
		return user;
	}

	async create(fields) {
		try {
			const hashedPassword = await bcrypt.hash(fields.password, SALT_ROUNDS);
			fields.password = hashedPassword;
			const insertId = await this.model.insert(fields);
			return AuthController.signSessionToken(insertId);
		} catch (error) {
			if (error.errno === UserModel.DUP_KEY_ERRNO) {
				throw new Conflict('User already exists', 'user_already_exists');
			}
			throw error;
		}
	}

	async update(fields, id) {
		try {
			if (fields.password) {
				const hashedPassword = await bcrypt.hash(
					fields.password,
					SALT_ROUNDS
				);
				fields.password = hashedPassword;
			}

			return await this.model.updateById(fields, id);
		} catch (error) {
			throw new Conflict(error.message);
		}
	}
}

export default new UserController();
