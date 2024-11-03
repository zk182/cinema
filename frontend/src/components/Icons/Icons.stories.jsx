import { Card, Grid, Typography } from '@mui/material';
import * as Icons from '.';

export default {
	title: 'Components/Icons',
	parameters: {
		layout: 'centered'
	},
	render: () => (
		<Grid container spacing={2}>
			{Object.entries(Icons).map(([key, Icon]) => (
				<Grid key={key} item xs={4} sm={3} md={2}>
					<Card
						sx={{
							textAlign: 'center',
							p: 2
						}}
					>
						<Typography sx={{ mb: 1 }}>{key}</Typography>
						<Icon />
					</Card>
				</Grid>
			))}
		</Grid>
	)
};

export const All = {
	args: {
		color: 'success',
		label: 'Paid'
	}
};
