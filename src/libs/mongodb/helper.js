import { ObjectId } from 'mongodb';

export function toId(_id) {
	if (_id instanceof ObjectId) {
		return _id;
	}
	return new ObjectId('' + _id);
}
