import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	Conflict Request Error
 */

export default class ConflictError extends HTTPError {
	constructor(message = 'conflict', customCode) {
		super(message);
		this.name = 'ConflictError';
		this[kErrorCode] = customCode;
		this[kCode] = 409;
	}
}
