import { FileImageCard } from '.';

export default {
	title: 'Molecules/FileImageCard',
	component: FileImageCard,
	parameters: {
		layout: 'centered'
	}
};

export const List = {
	args: {
		view: 'list',
		name: 'imagename.jpg',
		createdAt: new Date().toISOString()
	}
};

export const Grid = {
	args: {
		view: 'grid',
		name: 'imagename.jpg',
		createdAt: new Date().toISOString()
	}
};
