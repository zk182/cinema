export default [
	...Array.from({ length: 20 }, (_, i) => ({
		id: i + 1,
		hall_id: 1,
		row: Math.floor(i / 5) + 1,
		number: (i % 5) + 1,
		type: i % 5 === 0 || i % 5 === 1 ? 'vip' : undefined
	})),

	...Array.from({ length: 40 }, (_, i) => ({
		id: i + 21,
		hall_id: 2,
		row: Math.floor(i / 5) + 1,
		number: (i % 5) + 1,
		type: i % 5 === 0 || i % 5 === 1 ? 'vip' : undefined
	})),

	...Array.from({ length: 100 }, (_, i) => ({
		id: i + 61,
		hall_id: 3,
		row: Math.floor(i / 10) + 1,
		number: (i % 10) + 1,
		type: i % 10 === 0 || i % 10 === 1 ? 'vip' : undefined
	}))
];
