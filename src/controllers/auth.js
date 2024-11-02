import ms from 'ms';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import MasterController from './master.js';
import UserModel from '#src/models/user.js';
import { Unauthorized, ResourceNotFound } from '#src/errors/index.js';

const { JWT_KEY, SESSION_EXPIRATION } = process.env;
const COOKIE_NAME = 'cinema.user';
const tokenType = {
	SESSION: 'session',
	CHANGE_PASSWORD: 'changePassword'
};
const saltRounds = 10;

class AuthController extends MasterController {
	static Model = UserModel;

	static COOKIE_NAME = COOKIE_NAME;

	static SESSION_EXPIRATION = Number(SESSION_EXPIRATION) || 24;

	static SESSION_COOKIE = {
		maxAge: ms(`${this.SESSION_EXPIRATION}h`),
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production'
	};

	static JWT_KEY = JWT_KEY;

	signSessionToken(id) {
		return jwt.sign({ id, type: tokenType.SESSION }, JWT_KEY, {
			expiresIn: `${AuthController.SESSION_EXPIRATION}h`
		});
	}

	async login({ email, password, ip }) {
		const user = await this.model.getByEmail(email.trim().toLowerCase());

		if (!user) {
			throw new Unauthorized();
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new Unauthorized();
		}

		const token = this.signSessionToken(user.id);

		user.password = undefined;

		const fieldsToUpdate = {
			lastLogin: moment().toDate()
		};

		if (ip !== user.lastIp) {
			fieldsToUpdate.lastIp = ip;
		}

		await this.model.updateById(fieldsToUpdate, user.id);

		return { token, user };
	}

	async sendToken(email) {
		const user = await this.model.getByEmail(email);

		if (!user) {
			throw new ResourceNotFound('Invalid User', 'invalid_user');
		}

		const token = jwt.sign(
			{ id: user.id, type: tokenType.CHANGE_PASSWORD },
			JWT_KEY,
			{
				expiresIn: '1h'
			}
		);

		return token;
	}

	async resetPassword(data) {
		try {
			const { token, password } = data;
			const decodedToken = await jwt.verify(token, JWT_KEY);
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			const update = { password: hashedPassword };

			return await this.model.updateById(update, decodedToken.id);
		} catch (err) {
			if (['JsonWebTokenError', 'TokenExpiredError'].includes(err.name)) {
				throw new Unauthorized(
					'Invalid or Expired Token.',
					'invalid_token'
				);
			}
			throw err;
		}
	}
}

export default new AuthController();
