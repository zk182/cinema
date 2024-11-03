import { useState, useEffect } from 'react';
import './CinemaBooking.css';

import SessionModel from '@/models/session';

import { Button } from '@mui/material';
import { showError, showSuccess } from '@/utils';

function CinemaBooking({ layout, sessionId }) {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [reservedSeats, setReservedSeats] = useState([]);

	useEffect(() => {
		if (layout) {
			const reserved = [];
			layout.forEach(row => {
				row.forEach(seat => {
					if (seat.reserved) {
						reserved.push(seat.seat_id);
					}
				});
			});
			setReservedSeats(reserved);
		}
	}, [layout]);

	const toggleSeat = seatId => {
		if (reservedSeats.includes(seatId)) {
			return;
		}

		setSelectedSeats(prevSelected =>
			prevSelected.includes(seatId)
				? prevSelected.filter(id => id !== seatId)
				: [...prevSelected, seatId]
		);
	};

	const handleReserve = async () => {
		try {
			await SessionModel.reserve(sessionId, selectedSeats);
			showSuccess('Successfull Reserve');
			setSelectedSeats([]);
		} catch (error) {
			showError('There is a problem with your reserve, please try again');
		}
	};

	return (
		<div className="cinema">
			{layout.map((row, rowIndex) => (
				<div className="row" key={rowIndex}>
					{row.map((seat, seatIndex) => {
						const seatId = seat.seat_id;
						const seatNumber = rowIndex * row.length + seatIndex + 1;
						const isSelected = selectedSeats.includes(seatId);
						const isReserved = reservedSeats.includes(seatId);

						return (
							<div
								key={seatId}
								className={`seat ${isSelected ? 'selected' : ''} ${isReserved ? 'reserved' : ''}`}
								onClick={() => toggleSeat(seatId)}
							>
								{seatNumber}
								{isReserved && <span style={{ color: '#fff' }} />}
							</div>
						);
					})}
				</div>
			))}

			<Button
				onClick={handleReserve}
				disabled={selectedSeats.length === 0}
				style={{
					backgroundColor: selectedSeats.length === 0 ? 'grey' : 'black',
					color: 'white',
					border: 'none',
					padding: '10px 20px',
					cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
					marginTop: '10px'
				}}
			>
				Book Seats
			</Button>
		</div>
	);
}

export default CinemaBooking;
