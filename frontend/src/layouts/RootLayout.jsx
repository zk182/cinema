import { Provider as ReduxProvider } from 'react-redux';
import store from '@/store';
import { createTheme } from '@/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Snackbar } from '@/components/Snackbar';
import { YupConfig, LanguageConfig } from '@/components/Config';

export function RootLayout({ children }) {
	const theme = createTheme();

	return (
		<ReduxProvider store={store}>
			<YupConfig />
			<LanguageConfig />
			<ThemeProvider theme={theme}>
				<Snackbar />
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ReduxProvider>
	);
}
