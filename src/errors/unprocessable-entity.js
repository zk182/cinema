import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * Unprocessable Entity Error
 */
export default class UnprocessableEntity extends HTTPError {
	constructor(message = 'unprocessable entity', customCode) {
		super(message);
		this.name = 'UnprocessableEntity';
		this[kErrorCode] = customCode;
		this[kCode] = 422;
	}
}
