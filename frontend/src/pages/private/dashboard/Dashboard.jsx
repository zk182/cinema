/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Stack,
	alpha,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from '@mui/material';

import SessionModel from '@/models/session';
import { showError } from '@/utils';
import { Card } from '@/components/Card';
import CinemaBooking from '@/components/Cinema/CinemaBooking';

export function Dashboard() {
	const { loggedIn } = useSelector(state => state.auth);
	const [sessions, setSessions] = useState([]);
	const [selectedSession, setSelectedSession] = useState('');

	useEffect(() => {
		const fetchSessions = async () => {
			try {
				const fetchedSessions = await SessionModel.getAll();
				setSessions(fetchedSessions);
			} catch (error) {
				showError('Error fetching:', error);
			}
		};

		fetchSessions();
	}, [loggedIn]);

	const handleSessionChange = event => {
		const sessionId = event.target.value;
		setSelectedSession(sessionId);
	};

	const selectedSessionDetails = sessions.find(s => s.id === selectedSession);

	return (
		<Card
			sx={{
				p: 2,
				width: '100%',
				bgcolor: alpha('#fff', 0.4),
				boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
				backdropFilter: 'blur(1px)'
			}}
		>
			<Typography variant="h4" gutterBottom align="center">
				Cinema
			</Typography>

			<Typography variant="h6" align="center">
				Book your seat
			</Typography>

			<Stack alignItems="center" mb={3}>
				<FormControl fullWidth variant="outlined" sx={{ minWidth: 300 }}>
					<InputLabel id="session-select-label">Select Session</InputLabel>
					<Select
						labelId="session-select-label"
						value={selectedSession}
						onChange={handleSessionChange}
						label="Select Session"
					>
						<MenuItem value="" disabled>
							Select Session
						</MenuItem>
						{sessions.map(session => (
							<MenuItem key={session.id} value={session.id}>
								Cinema {session.hallId} - {session.movieName} -{' '}
								{session.startTime}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Stack>

			{selectedSessionDetails && (
				<Stack
					alignItems="center"
					direction="row"
					justifyContent="center"
					py={5}
					spacing={4}
				>
					<CinemaBooking sessionId={selectedSession} />
				</Stack>
			)}
		</Card>
	);
}
