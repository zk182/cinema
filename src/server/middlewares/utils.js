import jwt from 'jsonwebtoken';
import { Unauthorized } from '#src/errors/index.js';
import AuthController from '#src/controllers/auth.js';
import UserController from '#src/controllers/user.js';
import CacheManager from '#src/managers/cache.js';

const cache = CacheManager.memory('auth', {
	max: 2000,
	maxAge: 1000 * 60
});

const userFields = ['id', 'username', 'email'];

function getUserCacheKey(id, fields, label) {
	return `${label}-${id}-${fields.length}`;
}

async function fetchAndCache(id, fields, label) {
	const cacheKey = getUserCacheKey(id, fields, label);
	let user = cache.get(cacheKey);

	if (!user) {
		try {
			const promise = UserController.getById(id, fields);
			cache.set(cacheKey, promise);

			user = await promise;
			cache.set(cacheKey, user);
		} catch (e) {
			if (cache) {
				cache.del(cacheKey);
			}
			throw e;
		}
	}

	return user;
}

// eslint-disable-next-line no-unused-vars
export const validateToken = async (token, req, res) => {
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, AuthController.constructor.JWT_KEY);
	} catch {
		throw new Unauthorized();
	}

	const user = await fetchAndCache(decodedToken.id, userFields, 'user');

	req.user = user;
};

export const asyncHandler = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};
