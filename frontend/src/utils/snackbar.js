export function showError(error, options) {
	let message = '';
	let messageKey = '';

	if (typeof error === 'string') {
		message = error;
	}

	if (error?.status === 403) {
		messageKey = 'errors.forbidden';
	}

	if (error?.status === 429) {
		messageKey = 'errors.tooManyRequests';
	}

	const event = new CustomEvent('showSnackbar', {
		detail: {
			message,
			messageKey: message ? '' : messageKey || 'errors.generic',
			uuid: error?.data?.uuid,
			errorCode: error?.data?.errorCode,
			severity: 'error',
			...options
		}
	});

	window.dispatchEvent(event);
}

export function showSuccess(message, options) {
	const event = new CustomEvent('showSnackbar', {
		detail: {
			message,
			severity: 'success',
			...options
		}
	});

	window.dispatchEvent(event);
}
