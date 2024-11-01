import express from 'express';

const healthRouter = express.Router();

healthRouter.get('/', async (req, res) => {
	return res.json({ message: 'pong' });
});

export default healthRouter;
