import MongoDb from './mongodb.js';

import logger from '../logger.js';

import { defaultServer } from './config/index.js';

const pools = {};

/**
 * @param {object} options
 * @param {string} options.dbURI
 * @param {string} options.dbName
 */
export const connect = ({ dbURI, dbName } = defaultServer) => {
	// Use default connection of get direct from pool.
	const key = 'default';

	if (!pools[key]) {
		logger.info(`Using MongoDB connection - "${key}" instance.`);
		pools[key] = new MongoDb({
			dbURI,
			dbName
		});
	}

	return pools[key];
};

export const closeAll = () => {
	for (const kPool of Object.keys(pools)) {
		pools[kPool].close();
		delete pools[kPool];
	}
};
