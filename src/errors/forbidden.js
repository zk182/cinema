import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	Unauthorized Error
 */

export default class Forbidden extends HTTPError {
	constructor(message = 'Forbidden', customCode) {
		super(message);
		this.name = 'Forbidden';
		this[kErrorCode] = customCode;
		this[kCode] = 403;
	}
}
