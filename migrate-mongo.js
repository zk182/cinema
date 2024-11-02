import './src/config/index.js';
import { connect } from './src/libs/mongodb/index.js';

import reservationsData from '#src/data/default-reservations.js';
import SessionsSeatsData from '#src/data/default-sessions-seats.js';

import logger from '#src/libs/logger.js';

try {
	const database = connect();

	await database.collection('reservations').insertMany(reservationsData);
	await database.collection('sessionSeats').insertMany(SessionsSeatsData);

	await database.collection('reservations').createIndex({ session_id: 1 });
	await database.collection('reservations').createIndex({ user_id: 1 });

	await database.collection('sessionSeats').createIndex({ session_id: 1 });

	logger.info(`MongoDb migrations complete`);
} catch (e) {
	logger.error(`Failed to run mongodb migrations - ${e.message}`, e);
}
