import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import { Typography } from '@mui/material';
import { IMAGE_TTL_HOURS } from '@/config';
import { useSelector } from 'react-redux';
import { TimerTooltip } from './TimerTooltip';

dayjs.extend(durationPlugin);

export function Timer({ createdAt, tooltip, ...props }) {
	// get state to re-render every minute
	useSelector(state => state.myImages.minutes);

	if (!createdAt) {
		return null;
	}
	const endOfLife = dayjs.unix(createdAt).add(IMAGE_TTL_HOURS, 'hours');

	const timeLeftMinutes = endOfLife.diff(dayjs(), 'minutes');
	const duration = dayjs.duration(Math.max(timeLeftMinutes, 0), 'minutes');

	if (tooltip) {
		return (
			<TimerTooltip>
				<Typography {...props}>{duration.format('HH:mm')}</Typography>
			</TimerTooltip>
		);
	}

	return <Typography {...props}>{duration.format('HH:mm')}</Typography>;
}
