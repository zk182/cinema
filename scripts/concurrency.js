import http from 'node:http';

const BASE_URL = 'localhost';
const PORT = 3028;
const SESSION_ID = 5;
const SEATS_TO_RESERVE = JSON.stringify({ seatsId: [16, 17, 18, 19, 20] });
const CONCURRENT_REQUESTS = 100;

const TEST_COOKIE = // place your cookie here
	// eslint-disable-next-line max-len
	'cinema.user=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6InNlc3Npb24iLCJpYXQiOjE3MzA2NzI5NzcsImV4cCI6MTczMDY4MDE3N30.0p26uf8x6zK2pXRDEbgUujF7DETf57Vu8R5yO456FwM';

function reserveSeat(userId) {
	return new Promise((resolve, reject) => {
		const options = {
			hostname: BASE_URL,
			port: PORT,
			path: `/api/sessions/${SESSION_ID}/seats/reserve`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': SEATS_TO_RESERVE.length,
				Cookie: TEST_COOKIE
			}
		};

		const req = http.request(options, res => {
			let data = '';

			res.on('data', chunk => {
				data += chunk;
			});

			res.on('end', () => {
				console.log(`User ${userId}:`, data);
				resolve(data);
			});
		});

		req.on('error', error => {
			console.error(`User ${userId}: Reservation failed`, error.message);
			reject(error);
		});

		req.write(SEATS_TO_RESERVE);
		req.end();
	});
}

async function testConcurrency() {
	const promises = [];

	for (let i = 1; i <= CONCURRENT_REQUESTS; i++) {
		promises.push(reserveSeat(i));
	}

	try {
		await Promise.all(promises);
		console.log('All requests have been processed.');
	} catch (error) {
		console.error('An error occurred during concurrent requests:', error);
	}
}

testConcurrency();
