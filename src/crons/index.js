import fs from 'node:fs/promises';
import path from 'node:path';

import logger from '../libs/logger.js';

async function start() {
	if (process.env.NO_CRONS) {
		return logger.warn('NO CRONS RUNNING!');
	}

	const crons = await fs.readdir(import.meta.dirname);
	for (const cron of crons) {
		const cronPath = path.join(import.meta.dirname, cron);
		if (cronPath.endsWith('/index.js')) {
			continue;
		}

		await import(cronPath);
	}
}

await start();
