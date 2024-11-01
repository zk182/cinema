import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	ResourceNotFound Error
 */

export default class ResourceNotFound extends HTTPError {
	constructor(message = 'Not found', customCode) {
		super(message);
		this.name = 'ResourceNotFound';
		this[kErrorCode] = customCode;
		this[kCode] = 404;
	}
}
