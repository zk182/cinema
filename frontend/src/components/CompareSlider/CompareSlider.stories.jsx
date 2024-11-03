import peopleBeforeImage from '@/images/compare-slider/people_before.webp';
import peopleAfterImage from '@/images/compare-slider/people_after.webp';
import { CompareSlider } from '.';

export default {
	title: 'Components/CompareSlider',
	component: CompareSlider,
	parameters: {
		layout: 'centered'
	}
};

export const Base = {
	args: {
		itemOne: {
			src: peopleBeforeImage,
			alt: 'Before'
		},
		itemTwo: {
			src: peopleAfterImage,
			alt: 'After'
		}
	}
};
