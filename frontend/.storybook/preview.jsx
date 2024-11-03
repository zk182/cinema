import React from 'react';
import { GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { DocsContainer } from '@storybook/addon-docs';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { createTheme } from '../src/theme';
import '../src/i18next';
import { MemoryRouter } from 'react-router-dom';

dayjs.extend(localizedFormat);

const StoryProviders = ({ children }) => {
	const theme = createTheme();
	return (
		<MemoryRouter>
			<ThemeProvider theme={theme}>
				<GlobalStyles
					styles={{
						'*': {
							boxSizing: 'border-box'
						},
						html: {
							MozOsxFontSmoothing: 'grayscale',
							WebkitFontSmoothing: 'antialiased'
						},
						body: {
							fontFamily: 'Karla'
						}
					}}
				/>
				{children}
			</ThemeProvider>
		</MemoryRouter>
	);
};

/** @type {import('@storybook/react').Preview} */
const preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		docs: {
			container: ({ children, context }) => (
				<StoryProviders>
					<DocsContainer context={context}>{children}</DocsContainer>
				</StoryProviders>
			)
		}
	},
	decorators: [
		StoryFn => (
			<StoryProviders>
				<StoryFn />
			</StoryProviders>
		)
	]
};

export default preview;
