import { SvgIcon } from '@mui/material';

export function PadlockIcon(props) {
	return (
		<SvgIcon
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			{...props}
		>
			<path d="M18,9V8a5,5,0,0,0-5-5H11A5,5,0,0,0,6,8V9a3,3,0,0,0-3,3v6a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V12A3,3,0,0,0,18,9ZM8,8a3,3,0,0,1,3-3h2a3,3,0,0,1,3,3V9H8ZM19,18a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H18a1,1,0,0,1,1,1Z" />
			<path d="M12,13a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V14A1,1,0,0,0,12,13Z" />
		</SvgIcon>
	);
}
