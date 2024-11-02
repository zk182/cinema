import { MongoClient } from 'mongodb';

import { defaultServer } from './config/index.js';

const { MONGO_CONNECTION_POOL_LIMIT } = process.env;

const isTest = process.env.TEST;
export default class MongoDb {
	constructor(opts) {
		if (isTest) {
			return;
		}
		this.client = new MongoClient(opts.dbURI || defaultServer.dbURI, {
			minPoolSize: 0,
			maxPoolSize: Number(MONGO_CONNECTION_POOL_LIMIT) || 10
		});
		this.client.connect();
		this.database = this.client.db(opts.dbName || defaultServer.dbName);
	}

	collection(name) {
		return this.database.collection(name);
	}

	close() {
		this.client.close();
	}

	startSession() {
		return this.client.startSession();
	}
}
