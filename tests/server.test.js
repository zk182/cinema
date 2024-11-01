import test from 'node:test';
import { strict as assert } from 'node:assert';
import request from 'supertest';

import './setup.js';
import app from '#src/server/app.js';

test('Server', async t => {
	await t.test('error: stack present', async () => {
		// stack should only be present if process.env.SHOW_API_ERROR_STACK === 'true'
		process.env.SHOW_API_ERROR_STACK = 'true';
		const { status, body } = await request(app)
			.get('/invalid-endpoint-404-not-found')
			.set('Content-Type', 'application/json');
		// reset
		process.env.SHOW_API_ERROR_STACK = undefined;

		assert.strictEqual(status, 404);
		assert(!!body.stack);
	});

	await t.test('error: not found', async () => {
		const { status, body } = await request(app)
			.get('/invalid-endpoint-404-not-found')
			.set('Content-Type', 'application/json');

		assert.strictEqual(status, 404);
		assert.deepEqual(body, { error: true, message: 'Not found' });
	});

	await t.test('error: invalid JSON', async () => {
		const { status, body } = await request(app)
			.post('/api')
			.set('Content-Type', 'application/json')
			.send(` json: foo }`);

		assert.deepEqual(body, { error: true, message: 'Invalid JSON' });
		assert.strictEqual(status, 400);
	});

	await t.test('error: JSON Limit 250kb', async () => {
		const { status, body } = await request(app)
			.post('/api')
			.set('Content-Type', 'application/json')
			.send('["' + 'a'.repeat(256 * 1024) + '"]');

		assert.deepEqual(body, {
			error: true,
			message: 'Request entity too large (256KB)'
		});
		assert.strictEqual(status, 413);
	});
});
