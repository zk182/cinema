import { PlanPrice } from './PlanPrice';

export default {
	title: 'Components/PlanPrice',
	component: PlanPrice,
	parameters: {
		layout: 'centered'
	}
};

export const Default = {
	args: {
		amount: 29.9,
		currency: 'eur',
		period: 'monthly'
	}
};
