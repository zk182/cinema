import { LRUCache } from 'lru-cache';
import ms from 'ms';

const kMemory = Symbol('memory');

/**
 *	Cache Manager class - Singleton
 */

class CacheManager {
	constructor() {
		this[kMemory] = {};
	}

	/**
	 *	@param {string} namespace - The cache namespace
	 *	@return {LRU} LRUCache
	 *	@example
	 * const CacheManager = require('./modules/cache-manager');
	 * const cache = CacheManager.memory('ripple');
	 * const value = cache.get('cache-key');
	 */

	memory(namespace, settings = {}) {
		if (!this[kMemory][namespace]) {
			const options = {
				max: 500,
				ttl: ms('1h'), // 1 hour default max age
				...settings
			};

			this[kMemory][namespace] = new LRUCache(options);
		}

		return this[kMemory][namespace];
	}

	/**
	 *	Prune memory cache/s: Manually iterates over the entire cache proactively pruning old entries
	 *	@param {string} [namespace] - The cache of the namespace that will be pruned. If empty all caches will be pruned
	 *	@private
	 *	@return {Promise}
	 */

	prune(namespace) {
		return this.clean(namespace, 'prune');
	}

	/**
	 *	Reset memory cache/s
	 *	@param {string} [namespace] - The cache of the namespace that will be cleared. If empty all caches will be cleared
	 *	@private
	 *	@return {Promise}
	 */

	reset(namespace) {
		return this.clean(namespace, 'reset');
	}
}

export default new CacheManager();
