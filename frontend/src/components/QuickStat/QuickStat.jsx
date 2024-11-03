import { Stack, Typography } from '@mui/material';
import { Card } from '../Card';

export function QuickStat({ title, value, action, ...props }) {
	return (
		<Card variant="outlined" {...props}>
			<Stack
				alignItems="center"
				direction="row"
				height="100%"
				justifyContent="space-between"
				spacing={4}
				sx={{
					py: 1,
					pl: 2,
					pr: action ? 1 : 2,
					minHeight: '62px'
				}}
			>
				<Stack alignItems="center" direction="row" spacing={2}>
					<Typography
						variant="body3"
						fontWeight="bold"
						minWidth="25px"
						textAlign="right"
					>
						{value}
					</Typography>
					<Typography
						color="text.secondary"
						fontWeight="bold"
						variant="body1"
					>
						{title}
					</Typography>
				</Stack>

				{action}
			</Stack>
		</Card>
	);
}
