export default [
	{
		userId: 1,
		sessionId: 1,
		seatsId: [1, 2],
		reservationDate: new Date(),
		status: 'reserved'
	},
	{
		userId: 1,
		sessionId: 1,
		seatsId: [3],
		reservationDate: new Date(),
		status: 'cancelled'
	},
	{
		userId: 2,
		sessionId: 1,
		seatsId: [5],
		reservationDate: new Date(),
		status: 'reserved'
	},
	{
		userId: 3,
		sessionId: 1,
		seatsId: [15, 16, 17],
		reservationDate: new Date(),
		status: 'reserved'
	},
	{
		userId: 2,
		sessionId: 2,
		seatsId: [21, 22],
		reservationDate: new Date(),
		status: 'reserved'
	},
	{
		userId: 3,
		sessionId: 3,
		seatsId: [69],
		reservationDate: new Date(),
		status: 'reserved'
	},
	{
		userId: 1,
		sessionId: 3,
		seatsId: [70],
		reservationDate: new Date(),
		status: 'cancelled'
	}
];
