import { SvgIcon } from '@mui/material';

export function CircleCheckGreen(props) {
	return (
		<SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
			<path
				className="custom-color--circle-check-green"
				fill="#31d3b3"
				d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12c0-6.627 5.373-12 12-12s12 5.373 12 12z"
			/>
			<path
				fill="#000"
				d="M10 17.41l-4.71-4.7 1.42-1.42 3.29 3.3 7.29-7.3 1.42 1.42-8.71 8.7z"
			/>
		</SvgIcon>
	);
}
