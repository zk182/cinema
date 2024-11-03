/* eslint-disable max-len */
import http from 'node:http';

const BASE_URL = 'localhost';
const PORT = 3028;
const SESSION_ID = 3;
const TOTAL_REQUESTS = 500;
const TEST_COOKIE = // place your cookie here
	'cinema.user=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6InNlc3Npb24iLCJpYXQiOjE3MzA2NzI5NzcsImV4cCI6MTczMDY4MDE3N30.0p26uf8x6zK2pXRDEbgUujF7DETf57Vu8R5yO456FwM';

async function checkSeats() {
	return new Promise(resolve => {
		const options = {
			hostname: BASE_URL,
			port: PORT,
			path: `/api/sessions/${SESSION_ID}/seats`,
			method: 'GET',
			headers: {
				Cookie: TEST_COOKIE
			}
		};

		const req = http.request(options, res => {
			res.on('data', () => {});
			res.on('end', () => {
				if (res.statusCode >= 400) {
					resolve(res.statusCode);
				} else {
					resolve(null);
				}
			});
		});

		req.on('error', () => resolve('Network Error'));
		req.end();
	});
}

async function measureErrorRate() {
	let errorCount = 0;
	const errorCodes = {};

	for (let i = 0; i < TOTAL_REQUESTS; i++) {
		const error = await checkSeats();
		if (error) {
			errorCount++;
			errorCodes[error] = (errorCodes[error] || 0) + 1;
		}
	}

	const errorRate = (errorCount / TOTAL_REQUESTS) * 100;
	console.log(
		`Error rate: ${errorRate.toFixed(2)}% (${errorCount} de ${TOTAL_REQUESTS} solicitudes fallidas)`
	);
	console.log('Error breakdown by code:', errorCodes);
}

measureErrorRate();
