import { kCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	ProxyError
 */

export default class ProxyError extends HTTPError {
	constructor(body, status = 502) {
		super();
		this.name = 'ProxyError';
		this.body = body;
		this[kCode] = status;
	}
}
