import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	ToManyRequests Error
 */

export default class TooManyRequests extends HTTPError {
	constructor(message = 'To many requests', customCode) {
		super(message);
		this.name = 'TooManyRequests';
		this[kErrorCode] = customCode;
		this[kCode] = 429;
	}
}
