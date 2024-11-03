import { SvgIcon } from '@mui/material';

export function ChevronDownIcon(props) {
	return (
		<SvgIcon
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			{...props}
		>
			<path
				d="M7 14.4999L11.9683 9.49988L17 14.4999"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				transform="rotate(180 12 12)"
			/>
		</SvgIcon>
	);
}
