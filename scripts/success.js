/* eslint-disable max-len */
import http from 'node:http';

const BASE_URL = 'localhost';
const PORT = 3028;
const TOTAL_REQUESTS = 500;
const TEST_COOKIE = // place your cookie here
	'cinema.user=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6InNlc3Npb24iLCJpYXQiOjE3MzA2NzI5NzcsImV4cCI6MTczMDY4MDE3N30.0p26uf8x6zK2pXRDEbgUujF7DETf57Vu8R5yO456FwM';

async function checkSeats() {
	return new Promise(resolve => {
		const options = {
			hostname: BASE_URL,
			port: PORT,
			path: `/api/sessions`,
			method: 'GET',
			headers: {
				Cookie: TEST_COOKIE
			}
		};

		const req = http.request(options, res => {
			let data = '';
			res.on('data', chunk => {
				data += chunk;
			});

			res.on('end', () => {
				console.log(data);
				resolve(res.statusCode === 200);
			});
		});

		req.on('error', () => resolve(false));

		req.end();
	});
}

async function measureSuccessRate() {
	let successfulRequests = 0;

	for (let i = 0; i < TOTAL_REQUESTS; i++) {
		const success = await checkSeats();
		if (success) {
			successfulRequests++;
		}
	}

	const successRate = (successfulRequests / TOTAL_REQUESTS) * 100;
	console.log(
		`Success rate: ${successRate.toFixed(2)}% (${successfulRequests} de ${TOTAL_REQUESTS} succeded)`
	);
}

measureSuccessRate();
