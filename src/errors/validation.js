import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	Validation Error
 */

export default class ValidationError extends HTTPError {
	constructor(message = 'Validation Error', customCode) {
		super(message);
		this.name = 'ValidationError';
		this[kErrorCode] = customCode;
		this[kCode] = 400;
	}
}
