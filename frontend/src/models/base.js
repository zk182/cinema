class Model {
	origin = window.location.origin;

	baseUrl = '/api';

	constructor(resource) {
		this.resource = resource;
	}

	get basePath() {
		return `${this.baseUrl}${this.resource}`;
	}

	#addQueryParams(url, params) {
		if (!params) {
			return;
		}

		Object.entries(params).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach(val => {
					url.searchParams.append(`${key}[]`, val);
				});
			} else {
				url.searchParams.append(key, value);
			}
		});
	}

	async call({
		completeResponse = false,
		url: urlValue,
		body: bodyValue,
		headers,
		params,
		unauthorizedLogout = true,
		...other
	}) {
		try {
			let body = bodyValue;
			let baseHeaders = {};
			const url = new URL(urlValue, window.location.origin);

			this.#addQueryParams(url, params);

			if (
				!(
					bodyValue instanceof FormData ||
					bodyValue instanceof File ||
					ArrayBuffer.isView(bodyValue) ||
					bodyValue instanceof ArrayBuffer
				)
			) {
				body = JSON.stringify(bodyValue);
				baseHeaders = { 'Content-Type': 'application/json' };
			}

			const response = await fetch(url, {
				...other,
				headers: {
					...baseHeaders,
					...headers
				},
				body
			});

			if (!response.ok) {
				throw response;
			}

			if (
				completeResponse ||
				!(response.headers.get('content-type') || '').includes(
					'application/json'
				)
			) {
				return response;
			}

			try {
				return await response.json();
			} catch (err) {
				return response;
			}
		} catch (error) {
			if (error.status === 401 && unauthorizedLogout) {
				window.dispatchEvent(new Event('logout'));
			}

			if (
				error instanceof Response &&
				(error.headers.get('content-type') || '').includes(
					'application/json'
				)
			) {
				error.data = await error.json();
			}

			throw error;
		}
	}

	get(path, config = {}) {
		return this.call({ ...config, url: `${this.basePath}${path}` });
	}

	post(path, config = {}) {
		return this.call({
			...config,
			url: `${this.basePath}${path}`,
			method: 'POST'
		});
	}

	put(path, config = {}) {
		return this.call({
			...config,
			url: `${this.basePath}${path}`,
			method: 'PUT'
		});
	}

	patch(path, config = {}) {
		return this.call({
			...config,
			url: `${this.basePath}${path}`,
			method: 'PATCH'
		});
	}

	delete(path, config = {}) {
		return this.call({
			...config,
			url: `${this.basePath}${path}`,
			method: 'DELETE'
		});
	}

	buildUrl(path, params) {
		const url = new URL(`${this.basePath}${path}`, this.origin);
		this.#addQueryParams(url, params);

		return url.toString();
	}
}

export default Model;
