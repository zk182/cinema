import { kCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * 	ResourceLocked
 */

export default class ResourceLocked extends HTTPError {
	constructor(message = 'Resource locked') {
		super(message);
		this.name = 'ResourceLocked';
		this[kCode] = 423;
	}
}
