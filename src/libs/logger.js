/* node:coverage disable */

import pino from 'pino';

const logger = pino({
	messageKey: 'message',
	timestamp: pino.stdTimeFunctions.isoTime,
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	base: { pid: process.pid },
	enabled: !process.env.NOLOG
});

export default logger;
