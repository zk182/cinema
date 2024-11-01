import test from 'node:test';
import { strict as assert } from 'node:assert';
import request from 'supertest';
import '../setup.js';
import app from '#src/server/app.js';
import AuthController from '#src/controllers/auth.js';

const userMock = {
	token: 'token',
	user: {
		id: 1,
		name: 'jhon',
		email: 'jhon@gmail.com'
	}
};

test('Auth routes', async t => {
	await t.test('POST /api/auth/login', async () => {
		AuthController.login = async () => userMock;
		const { status, body } = await request(app)
			.post('/api/auth/login')
			.set('Content-Type', 'application/json')
			.send({
				email: 'jhon@gmail.com',
				password: '123456'
			});

		assert.strictEqual(status, 200);
		assert.deepEqual(body, userMock.user);
	});

	await t.test('GET /api/auth/logout', async () => {
		const { status, body, headers } = await request(app)
			.get('/api/auth/logout')
			.set('Content-Type', 'application/json')
			.set('Cookie', [`cinema.user=sarasa`]);

		const cookieHeader = headers['set-cookie'][0];
		const expiresDate = new Date(cookieHeader.match(/Expires=([^;]+)/)[1]);
		assert.ok(expiresDate < new Date());
		assert.strictEqual(status, 200);
		assert.deepEqual(body, { success: true });
	});

	await t.test('POST /api/auth/reset-password', async () => {
		AuthController.resetPassword = async () => true;
		const { status, body } = await request(app)
			.post('/api/auth/reset-password')
			.set('Content-Type', 'application/json')
			.send({ token: 'token', password: '123456' });

		assert.strictEqual(status, 200);
		assert.deepEqual(body, {
			success: true
		});
	});
});
