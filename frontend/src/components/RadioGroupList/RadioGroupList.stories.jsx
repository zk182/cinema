import { RadioGroupList } from './RadioGroupList';

export default {
	title: 'Components/RadioGroupList',
	component: RadioGroupList,
	parameters: {
		layout: 'centered'
	}
};

export const Default = {
	args: {
		defaultValue: '1',
		ariaLabelledby: 'demo-customized-radios',
		name: 'customized-radios',
		items: [
			{
				id: '1',
				label: '150 credits',
				rightLabel: '€ 1.50'
			},
			{
				id: '2',
				label: '500 credits',
				rightLabel: '€ 5.00'
			},
			{
				id: '3',
				label: '1000 credits',
				rightLabel: '€ 10.00'
			}
		]
	}
};
