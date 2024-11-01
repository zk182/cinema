import express from 'express';

import HallController from '#src/controllers/hall.js';
import { asyncHandler } from '../middlewares/utils.js';

const HallRouter = express.Router();

HallRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const halls = await HallController.list();
		return res.json(halls);
	})
);

export default HallRouter;
