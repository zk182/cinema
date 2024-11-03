import { Stack, capitalize } from '@mui/material';
import { Button } from './Button';

const colors = ['primary', 'secondary', 'success', 'error'];

export default {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		backgroundColor: { control: 'color' }
	},
	render: props => (
		<Stack direction="row" spacing={1}>
			{colors.map(color => (
				<Button key={color} {...props} color={color}>
					{props.children || capitalize(color)}
				</Button>
			))}
		</Stack>
	)
};

export const Contained = {
	args: {
		variant: 'contained'
	}
};

export const Outlined = {
	args: {
		variant: 'outlined'
	}
};

export const Text = {
	args: {
		variant: 'text'
	}
};

export const Loading = {
	args: {
		loading: true,
		variant: 'contained'
	}
};
