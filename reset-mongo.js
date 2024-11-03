import './src/config/index.js';
import { connect } from './src/libs/mongodb/index.js';

import reservationsData from '#src/data/default-reservations.js';
import SessionsSeatsData from '#src/data/default-sessions-seats.js';

import logger from '#src/libs/logger.js';

try {
	const database = connect();

	await database.collection('reservations').deleteMany({});
	await database.collection('sessionSeats').deleteMany({});

	await database.collection('reservations').insertMany(reservationsData);
	await database.collection('sessionSeats').insertMany(SessionsSeatsData);

	logger.info(`MongoDb reset complete`);

	process.exit();
} catch (e) {
	logger.error(`Failed to run mongodb reset - ${e.message}`, e);
}
