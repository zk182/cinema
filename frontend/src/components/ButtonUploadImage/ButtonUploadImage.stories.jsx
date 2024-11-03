import { ButtonUploadImage } from './ButtonUploadImage';

export default {
	title: 'Components/ButtonUploadImage',
	component: ButtonUploadImage,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		backgroundColor: { control: 'color' }
	}
};

export const Contained = {
	args: {
		variant: 'contained'
	}
};
