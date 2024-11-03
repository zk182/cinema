import { SvgIcon } from '@mui/material';

export function CheckIcon({ checkColor, ...props }) {
	return (
		<SvgIcon
			width="26"
			height="26"
			viewBox="0 0 26 26"
			fill="none"
			{...props}
		>
			<g fill="none" fillRule="evenodd">
				<circle fill="currentColor" cx="13" cy="13" r="13" />
				<path
					fill={checkColor || '#FFF'}
					fillRule="nonzero"
					d="m17.444 7.313 2.424 2.165-7.849 8.784L6.5 13.21l2.194-2.397 3.092 2.83z"
				/>
			</g>
		</SvgIcon>
	);
}
