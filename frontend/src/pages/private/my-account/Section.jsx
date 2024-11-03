import { Stack, Typography } from '@mui/material';

export function Section({ title, children, action, ...props }) {
	return (
		<Stack {...props} display="inline-flex" width="100%">
			<Typography
				variant="body2"
				fontWeight="semi"
				fontSize={{
					xs: '20px',
					md: '24px'
				}}
				mb={{
					xs: 3,
					md: 4
				}}
			>
				{title}
			</Typography>
			<Stack spacing={2}>
				{children}
				{action && (
					<Stack direction="row" justifyContent="end">
						{action}
					</Stack>
				)}
			</Stack>
		</Stack>
	);
}
