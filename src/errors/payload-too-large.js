import bytes from 'bytes';

import { kCode } from './symbols.js';
import HTTPError from './http.js';

/**
 * PayloadTooLarge Error
 */
export default class PayloadTooLarge extends HTTPError {
	constructor(length) {
		const message =
			`Request entity too large` +
			(length && typeof length === 'number'
				? ` (${bytes.format(length)})`
				: '');

		super(message);
		this.message = message;
		this.name = 'PayloadTooLarge';
		this[kCode] = 413;
	}
}
