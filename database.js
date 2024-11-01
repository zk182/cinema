import './src/config/index.js';
import { Client } from 'pg';

import logger from '#src/libs/logger.js';

try {
	const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT } =
		process.env;

	const client = new Client({
		host: DATABASE_HOST,
		user: DATABASE_USER,
		password: DATABASE_PASSWORD,
		port: DATABASE_PORT
	});

	await client.connect();

	await client.query(`CREATE DATABASE IF NOT EXISTS cinema`);
	logger.info(`Database creation completed`);

	await client.end();
} catch (e) {
	logger.error(`Failed to create database - ${e.message}`, e);
}
