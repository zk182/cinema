import AuthController from '#src/controllers/auth.js';
import { Unauthorized } from '#src/errors/index.js';
import { validateToken } from './utils.js';

const isTest = process.env.TEST;
const auth =
	(throwError = true) =>
	async (req, res, next) => {
		if (isTest) {
			req.user = { id: 1 };
			return next();
		}

		const token = req.cookies[AuthController.constructor.COOKIE_NAME];

		if (!token) {
			if (!throwError) {
				return next();
			}
			return next(new Unauthorized());
		}

		try {
			await validateToken(token, req, res);
		} catch (e) {
			if (throwError) {
				return next(e);
			}
		}

		return next();
	};

export default auth;
