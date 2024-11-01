const { MONGO_DB_URI, MONGO_DB_NAME } = process.env;

// Define config for writable server.
export const defaultServer = {
	dbURI: MONGO_DB_URI,
	dbName: MONGO_DB_NAME
};
