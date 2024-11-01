import { kCode, kErrorCode } from './symbols.js';
import HTTPError from './http.js';

export default class PaymentRequired extends HTTPError {
	constructor(message = 'Payment required', customCode) {
		super(message);
		this.name = 'PaymentRequired';
		this[kErrorCode] = customCode;
		this[kCode] = 402;
	}
}
