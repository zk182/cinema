import Redis from 'ioredis';
import ms from 'ms';
import moment from 'moment';

import logger from '../libs/logger.js';
import { ResourceLocked } from '../errors/index.js';

const LOCK_TTL = 30; // default lock in seconds

/**
 *	Redis Manager class - Singleton
 */

class RedisManager {
	constructor() {
		this.clients = {};
		this.started = false;
	}

	/**
	 *	Create a redis client
	 *	@param {object} options - Redis client options
	 *	@param {boolean} [promise=true] - Whether to promisify methods or not. There are cases where we need an unmodified client (IE: to pass to socket.io adapter)
	 *	@return {object} redis client
	 */

	client(label, options = {}) {
		if (this.clients[label]) {
			return this.clients[label];
		}

		const defaults = {
			host: process.env.REDIS_HOST || 'localhost',
			port: process.env.REDIS_PORT || 6379,
			retryStrategy: data => {
				if (!this.started) {
					return 5000;
				} // If it never started retry every 5 seconds.

				return Math.min(data.total_retry_time || 1000, ms('30s'));
			}
		};

		const client = new Redis({ ...defaults, ...options });

		client.on('connect', () => {
			logger.info(`Redis [${label}] - connected`);
			this.started = true;
		});
		client.on('error', err => logger.error(err.message));

		this.clients[label] = client;

		return client;
	}

	/**
	 *	Close all redis connections
	 *	@return {promise}
	 */

	close() {
		return Promise.all(
			Object.entries(this.clients).map(([key, client]) => {
				const promise = new Promise(resolve => client.on('end', resolve));

				client.quit();

				delete this.clients[key];
				return promise;
			})
		);
	}

	#lockKey(id) {
		return `lock:${id}`;
	}

	async lock(id, options = {}) {
		const { ttl = LOCK_TTL, strict } = options;
		const lockValue = moment().unix();
		const key = this.#lockKey(id);
		const client = this.client('lock');
		try {
			const result = await client.set(key, lockValue, 'NX', 'EX', ttl);

			if (result !== 'OK') {
				throw new ResourceLocked(`Resource ${id} already locked`);
			}
		} catch (error) {
			if (strict || error instanceof ResourceLocked) {
				throw error;
			}

			// if not strict mode and there's a connection error
			// we swallow the error
			logger.error(
				`An error ocurred while acquiring lock ${key} - ${error.message}`
			);
		}

		return {
			id,
			release() {
				// Ensure the lock is released
				return client.del(key).catch(() => {});
			}
		};
	}
}

export default new RedisManager();
