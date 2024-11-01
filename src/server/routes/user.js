import express from 'express';
import { validate } from 'express-validation';

import auth from '#src/server/middlewares/auth.js';

import AuthController from '#src/controllers/auth.js';
import UserController from '#src/controllers/user.js';
import { asyncHandler } from '../middlewares/utils.js';
import { createUserValidator, updateUserValidator } from '#src/schemas/user.js';
import { kCountry } from '#src/server/middlewares/metadata.js';

const UserRouter = express.Router();

UserRouter.get(
	'/me',
	auth(),
	asyncHandler(async (req, res) => {
		const user = await UserController.getById(req.user.id);
		return res.json(user);
	})
);

UserRouter.patch(
	'/me',
	auth(),
	validate(updateUserValidator),
	async (req, res) => {
		await UserController.update(req.body, req.user.id);
		return res.json({ success: true });
	}
);

UserRouter.post(
	'/register',
	validate(createUserValidator, { context: true }),
	asyncHandler(async (req, res) => {
		const user = {
			...req.body,
			userAgent: req.headers['user-agent'],
			country: req[kCountry]
		};

		const token = await UserController.create(user);

		res.cookie(
			AuthController.constructor.COOKIE_NAME,
			token,
			AuthController.constructor.SESSION_COOKIE
		);

		return res.status(201).json({ success: true });
	})
);

export default UserRouter;
