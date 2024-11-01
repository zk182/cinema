import { ValidationError } from 'express-validation';

import logger from '#src/libs/logger.js';
import { kCode, kErrorCode } from '#src/errors/symbols.js';
import {
	BadRequest,
	ResourceNotFound,
	Unauthorized,
	PayloadTooLarge,
	ProxyError
} from '#src/errors/index.js';

const notFoundHandler = (req, res, next) => next(new ResourceNotFound());

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	// eslint-disable-line no-unused-vars

	if (!(err instanceof Unauthorized) && !(err instanceof ResourceNotFound)) {
		const user = (req.user && req.user.id) || 'guest';
		logger.error(
			{ err },
			`Express Error [${user}] ${req.method} ${req.originalUrl}`
		);
	}

	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json({
			message: err.message,
			data: err.details
		});
	}

	if (err?.name?.includes('PayloadTooLargeError')) {
		err = new PayloadTooLarge(Number(req.header('content-length')));
	} else if (err instanceof SyntaxError) {
		err = new BadRequest('Invalid JSON');
	}

	if (err instanceof ProxyError) {
		return res.status(err[kCode] || 500).json(err.body);
	}

	const message = err[kCode] ? err.message : 'Internal Server Error';
	const customCode = err[kErrorCode];
	const shouldShowStack = process.env.SHOW_API_ERROR_STACK === 'true';

	res.status(err[kCode] || 500).json({
		error: true,
		message,
		errorCode: customCode,
		data: err.data,
		stack: shouldShowStack ? err.stack : undefined,
		...(req.cfIdempotencyKey && { cfIdempotencyKey: req.cfIdempotencyKey })
	});
};

export default [notFoundHandler, errorHandler];
