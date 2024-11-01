import Database from './database.js';

import logger from '../logger.js';

import { defaultServer } from './config/index.js';

export { replicaServers } from './config/index.js';
export { toCamelCase, toSnakeCase, getRandomItem } from './helper.js';

const pools = {};

/**
 * @param {object} options
 * @param {object} options.connection
 * @param {string} options.connection.host
 * @param {string} options.connection.user
 * @param {string} options.connection.database
 * @param {number} options.connection.port
 * @param {string} options.connection.password
 * @param {string} options.connection.charset
 * @param {string} options.prefix
 * @param {boolean} useReplica - Is True use a read replica server from a list.
 */
export const connect = ({ prefix, connection } = defaultServer) => {
	// Use default connection of get direct from pool.
	const key = prefix || 'default';

	if (!pools[key]) {
		logger.info(`Using DB connection - "${key}" instance.`);
		pools[key] = new Database({
			connection
		});
	}

	return pools[key];
};
