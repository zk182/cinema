import { SvgIcon } from '@mui/material';

export function ArrowLeftIcon(props) {
	return (
		<SvgIcon
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			{...props}
		>
			<path
				d="M10.5 7L5.5 11.9683L10.5 17"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path
				d="M6.5 12L18.5 12"
				fill="none"
				stroke="currentColor"
				strokeLinecap="square"
				strokeWidth="2"
			/>
		</SvgIcon>
	);
}
