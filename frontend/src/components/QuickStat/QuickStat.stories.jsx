import { QuickStat } from '.';
import { Button } from '../Button';

export default {
	title: 'Components/QuickStat',
	component: QuickStat,
	parameters: {
		layout: 'centered'
	}
};

export const Standard = {
	args: {
		value: 15,
		title: 'Credits'
	}
};

export const Action = {
	args: {
		value: 15,
		title: 'Credits',
		action: (
			<Button variant="outlined" size="large">
				Buy Credits
			</Button>
		)
	}
};
