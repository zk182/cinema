import hosts from './hosts.js';

const {
	DATABASE_HOST,
	DATABASE_USER,
	DATABASE_PASSWORD,
	DATABASE_NAME,
	DATABASE_PORT,
	ENVIRONMENT,
	DATABASE_ENVIRONMENT
} = process.env;

// Define config for writable server.
export const defaultServer = {
	connection: {
		host: DATABASE_HOST,
		user: DATABASE_USER,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME,
		port: DATABASE_PORT,
		charset: 'utf8mb4',
		// Important for update/upsert correct returned info
		flags: '-FOUND_ROWS'
	},
	prefix: 'default'
};

// Define read replica pool list.
const replicaHosts = hosts[DATABASE_ENVIRONMENT] ?? hosts[ENVIRONMENT];

export const replicaServers = replicaHosts
	? replicaHosts.map((host, index) => ({
			connection: {
				host,
				user: DATABASE_USER,
				password: DATABASE_PASSWORD,
				database: DATABASE_NAME,
				port: DATABASE_PORT,
				charset: 'utf8mb4',
				flags: '-FOUND_ROWS'
			},
			prefix: `read-${index}`
		}))
	: [];
