import './config/index.js';
import './crons/index.js';

import logger from '#src/libs/logger.js';
import app from './server/app.js';

const port = Number(process.env.PORT) || 3028;
app.listen(port, () => {
	logger.info(`server listening on port: ${port}`);
});
