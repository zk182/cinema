import { SvgIcon } from '@mui/material';

export function SearchIcon(props) {
	return (
		<SvgIcon
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			{...props}
		>
			<circle
				cx="11"
				cy="11"
				fill="none"
				r="6"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path d="M17 17L20 20" stroke="currentColor" strokeWidth="2" />
		</SvgIcon>
	);
}
