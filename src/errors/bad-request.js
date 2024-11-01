import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	Bad Request Error
 */

export default class BadRequestError extends HTTPError {
	constructor(message = 'bad request', customCode) {
		super(message);
		this.name = 'BadRequestError';
		this[kErrorCode] = customCode;
		this[kCode] = 400;
	}
}
