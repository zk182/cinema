import { SvgIcon } from '@mui/material';

export function ArrowRightIcon(props) {
	return (
		<SvgIcon
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M13.5 7L18.5 11.9683L13.5 17"
				fill="none"
				stroke="#0C0C0C"
				strokeWidth="2"
			/>
			<path
				d="M17.5 12L5.5 12"
				fill="none"
				stroke="#0C0C0C"
				strokeLinecap="square"
				strokeWidth="2"
			/>
		</SvgIcon>
	);
}
