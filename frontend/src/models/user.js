import BaseModel from './base';

class UserModel extends BaseModel {
	async me() {
		const response = await this.get('/me', { completeResponse: true });

		const country = response.headers.get('x-country') || '';

		const data = await response.json();

		return {
			...data,
			country: country?.toLowerCase()
		};
	}

	async create(body) {
		return this.post('/register', {
			body
		});
	}
}

export default new UserModel('/users');
