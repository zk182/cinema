/* eslint-disable max-len */
/* eslint-disable no-console */
import http from 'node:http';
import os from 'node:os';

const BASE_URL = 'localhost';
const PORT = 3028;
const SESSION_ID = 3;
const CONCURRENT_REQUESTS = 500;

const TEST_COOKIE = // place your cookie here
	'cinema.user=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6InNlc3Npb24iLCJpYXQiOjE3MzA2NzI5NzcsImV4cCI6MTczMDY4MDE3N30.0p26uf8x6zK2pXRDEbgUujF7DETf57Vu8R5yO456FwM';

function checkSeats(userId) {
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
			// eslint-disable-next-line no-unused-vars
			let data = '';
			const startTime = Date.now();

			res.on('data', chunk => {
				data += chunk;
			});

			res.on('end', () => {
				const responseTime = Date.now() - startTime;
				console.log(`User ${userId}: Response time: ${responseTime} ms`);
				resolve({ responseTime, success: true });
			});
		});

		req.on('error', error => {
			console.error(`User ${userId}: Request failed`, error.message);
			resolve({ success: false });
		});

		req.end();
	});
}

async function testConcurrency() {
	const promises = [];
	const responseTimes = [];
	let failedRequests = 0;

	for (let i = 1; i <= CONCURRENT_REQUESTS; i++) {
		promises.push(
			checkSeats(i).then(({ responseTime, success }) => {
				if (success) {
					responseTimes.push(responseTime);
				} else {
					failedRequests++;
				}
			})
		);
	}

	try {
		await Promise.all(promises);
		const successfulRequests = responseTimes.length;
		const totalRequests = successfulRequests + failedRequests;
		const averageResponseTime =
			successfulRequests > 0
				? responseTimes.reduce((acc, time) => acc + time, 0) /
					successfulRequests
				: 0;
		const failureRate = (failedRequests / totalRequests) * 100;

		console.log('\nAll requests have been processed.');
		console.log(
			`Average response time: ${averageResponseTime.toFixed(2)} ms`
		);
		console.log(`Failed requests: ${failedRequests}`);
		console.log(`Failure rate: ${failureRate.toFixed(2)}%\n`);

		// Display hardware and environment information
		console.log('Environment Details:');
		console.log(`CPU: ${os.cpus()[0].model}`);
		console.log(`Cores: ${os.cpus().length}`);
		console.log(`RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
		console.log(`OS: ${os.type()} ${os.release()}`);
		console.log(`Architecture: ${os.arch()}`);
		console.log(`Node.js Version: ${process.version}`);
	} catch (error) {
		console.error('An error occurred during concurrent requests:', error);
	}
}

testConcurrency();
