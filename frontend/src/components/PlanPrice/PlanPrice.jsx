import { formatPrice } from '@/utils';
import { Typography } from '@mui/material';

export function PlanPrice({ amount, currency, period, sx, ...props }) {
	return (
		<Typography
			fontSize={40}
			lineHeight="56px"
			fontWeight="bold"
			color="primary.main"
			{...props}
			sx={{
				...sx,
				'.period': {
					display: 'inline-block',
					marginLeft: '6px'
				}
			}}
		>
			{formatPrice({ amount, currency })}
			{period && (
				<Typography
					className="period"
					component="span"
					variant="body0"
					color="text.secondary"
				>
					{`/${period}`}
				</Typography>
			)}
		</Typography>
	);
}
