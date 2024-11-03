import { FormControlLabel, RadioGroup, Stack } from '@mui/material';
import { Radio } from './Radio';

const colors = ['primary', 'secondary', 'success', 'error'];

export default {
	title: 'Components/Radio',
	component: Radio,
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		backgroundColor: { control: 'color' }
	},
	render: () => (
		<Stack direction="row" spacing={1}>
			<RadioGroup
				defaultValue={colors[0]}
				aria-labelledby="demo-customized-radios"
				name="customized-radios"
			>
				{colors.map(color => (
					<FormControlLabel
						value={color}
						control={<Radio color={color} />}
						label={color}
					/>
				))}
				<FormControlLabel
					value="disabled"
					disabled
					control={<Radio />}
					label="disabled"
				/>
			</RadioGroup>
		</Stack>
	)
};

export const Default = {
	args: {}
};
