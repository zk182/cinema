import './src/config/index.js';
import { connect } from './src/libs/database/index.js';

import logger from '#src/libs/logger.js';

try {
	const { connection } = connect();
	await connection.migrate.latest();
	logger.info(`Database migrations complete`);
	await connection.destroy();
} catch (e) {
	logger.error(`Failed to run migrations - ${e.message}`, e);
}
