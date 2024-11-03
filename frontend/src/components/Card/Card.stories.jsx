import { CardActions, CardHeader, Chip } from '@mui/material';
import { Button } from '../Button';
import { Card } from '.';

export default {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered'
	},
	render: props => {
		return (
			<Card {...props}>
				<CardHeader
					title="Subscription"
					subheader="Next renewal April 23, 2024"
					action={<Chip label="Active" color="success" />}
				/>
				<CardActions>
					<Button variant="outlined">Cancel subscription</Button>
				</CardActions>
			</Card>
		);
	}
};

export const Outlined = {
	args: {
		variant: 'outlined',
		sx: {
			width: 388
		}
	}
};

export const Pressed = {
	args: {
		variant: 'pressed',
		sx: {
			width: 388
		}
	}
};

export const Standard = {
	args: {
		variant: 'standard',
		sx: {
			width: 388
		}
	}
};

export const Transparent = {
	args: {
		variant: 'transparent',
		sx: {
			width: 388
		}
	}
};
