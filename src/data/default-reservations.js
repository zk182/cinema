export default [
	{
		user_id: 1,
		session_id: 1,
		seats_id: [1, 2],
		confirmed_at: new Date(),
		status: 'reserved',
		is_reserved: true
	},
	{
		user_id: 1,
		session_id: 1,
		seats_id: [3],
		confirmed_at: new Date(),
		status: 'cancelled',
		is_reserved: false
	},
	{
		user_id: 2,
		session_id: 1,
		seats_id: [5],
		confirmed_at: new Date(),
		status: 'reserved',
		is_reserved: true
	},
	{
		user_id: 3,
		session_id: 1,
		seats_id: [15, 16, 17],
		confirmed_at: new Date(),
		status: 'reserved',
		is_reserved: true
	},
	{
		user_id: 2,
		session_id: 2,
		seats_id: [21, 22],
		confirmed_at: new Date(),
		status: 'reserved',
		is_reserved: true
	},
	{
		user_id: 3,
		session_id: 3,
		seats_id: [69],
		confirmed_at: new Date(),
		status: 'reserved',
		is_reserved: true
	},
	{
		user_id: 1,
		session_id: 3,
		seats_id: [70],
		confirmed_at: new Date(),
		status: 'cancelled',
		is_reserved: false
	}
];
