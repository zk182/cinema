import MasterModel from './master.js';

export default class UserModel extends MasterModel {
	static table = 'users';

	getByEmail(email, fields = '*') {
		return this.readQuery.first(fields).where({ email });
	}
}
