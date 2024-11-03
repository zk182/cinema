import { Tab, Tabs } from '@mui/material';

export default {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered'
	},
	render(args) {
		return (
			<Tabs {...args}>
				<Tab value={0} label="Background" />
				<Tab value={1} label="Erase / Restore" />
			</Tabs>
		);
	}
};

export const Default = {
	args: {
		value: 0
	}
};
