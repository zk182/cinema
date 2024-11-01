import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import errorHandler from './middlewares/errors.js';
import routes from './routes/index.js';
import { setClientMetadata } from './middlewares/metadata.js';

const app = express();

// Settings
app.use(cors({ credentials: true, origin: true }));

app.set('trust proxy', true);

app.use(cookieParser());
app.use(setClientMetadata);

// Routes
app.use('/api', express.json({ limit: '50kb' }), routes);

// Error handler, must be called last
app.use(errorHandler);

export default app;
