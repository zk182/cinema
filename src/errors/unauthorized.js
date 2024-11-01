import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	Unauthorized Error
 */

export default class Unauthorized extends HTTPError {
	constructor(message = 'Unauthorized', customCode) {
		super(message);
		this.name = 'Unauthorized';
		this[kErrorCode] = customCode;
		this[kCode] = 401;
	}
}
