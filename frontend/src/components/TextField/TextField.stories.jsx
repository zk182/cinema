import { TextField } from '@mui/material';

export default {
	title: 'Components/TextField',
	component: TextField,
	parameters: {
		layout: 'centered'
	}
};

export const Outlined = {
	args: {
		label: 'Label',
		placeholder: 'Placeholder'
	}
};

export const Error = {
	args: {
		error: true,
		label: 'Label',
		placeholder: 'Placeholder',
		helperText: 'Error message'
	}
};

export const Disabled = {
	args: {
		label: 'Label',
		placeholder: 'Placeholder',
		disabled: true
	}
};
