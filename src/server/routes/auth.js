import express from 'express';
import { validate } from 'express-validation';
import {
	loginValidator,
	sendCodeValidator,
	resetPasswordValidator
} from '#src/schemas/auth.js';

import AuthController from '#src/controllers/auth.js';
import { asyncHandler } from '../middlewares/utils.js';
import { kIp } from '#src/server/middlewares/metadata.js';

const AuthRouter = express.Router();

AuthRouter.post(
	'/login',
	validate(loginValidator),
	asyncHandler(async (req, res) => {
		const ip = req[kIp];
		const { email, password } = req.body;
		const { token, user } = await AuthController.login({
			email,
			password,
			ip
		});

		res.cookie(
			AuthController.constructor.COOKIE_NAME,
			token,
			AuthController.constructor.SESSION_COOKIE
		);

		return res.json(user);
	})
);

AuthRouter.get(
	'/logout',
	asyncHandler(async (req, res) => {
		res.clearCookie(AuthController.constructor.COOKIE_NAME);
		return res.json({ success: true });
	})
);

AuthRouter.post(
	'/send-token',
	validate(sendCodeValidator),
	asyncHandler(async (req, res) => {
		const token = await AuthController.sendToken(req.body.email);
		return res.json({ token });
	})
);

AuthRouter.post(
	'/reset-password',
	validate(resetPasswordValidator),
	asyncHandler(async (req, res) => {
		await AuthController.resetPassword(req.body);
		return res.json({ success: true });
	})
);

export default AuthRouter;
