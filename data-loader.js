import './src/config/index.js';

import usersData from './src/data/default-users.js';
import seatsData from './src/data/default-seats.js';
import hallsData from './src/data/default-halls.js';
import sessionsData from '#src/data/default-sessions.js';

import { connect } from './src/libs/database/index.js';

import logger from '#src/libs/logger.js';

try {
	const { connection } = connect();

	await connection.transaction(async trx => {
		await trx.insert(usersData).into('users').transacting(trx);
		await trx.insert(hallsData).into('halls').transacting(trx);
		await trx.insert(seatsData).into('seats').transacting(trx);
		await trx.insert(sessionsData).into('sessions').transacting(trx);
	});

	logger.info(`Database default values imported`);
	await connection.destroy();
} catch (e) {
	logger.error(`Failed to create default values - ${e.message}`, e);
}
