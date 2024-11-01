import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	Quota Exceeded Error
 */

export default class QuotaExceededError extends HTTPError {
	constructor(message = 'Quota Exceeded', customCode) {
		super(message);
		this.name = 'QuotaExceededError';
		this[kErrorCode] = customCode;
		this[kCode] = 403;
	}
}
