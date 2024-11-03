const fonts = `
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Alatsi&family=Karla&display=swap" rel="stylesheet" />
`;

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: ['../public'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	previewHead: head => `${head}${fonts}`,
	managerHead: head => `${head}${fonts}`,
	webpackFinal: async config => {
		return {
			...config,
			resolve: {
				...config.resolve,
				modules: [path.resolve(__dirname, '..'), 'node_modules']
			}
		};
	}
};
export default config;
