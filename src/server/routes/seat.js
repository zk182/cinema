import express from 'express';

import SeatController from '#src/controllers/seat.js';
import { asyncHandler } from '../middlewares/utils.js';

const SeatRouter = express.Router();

SeatRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const halls = await SeatController.list();
		return res.json(halls);
	})
);

export default SeatRouter;
