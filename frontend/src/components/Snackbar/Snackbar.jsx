import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MuiSnackbar from '@mui/material/Snackbar';
import Alert, { alertClasses } from '@mui/material/Alert';
import { toCamelCase } from '@/utils';

const DURATION = 3000;

export function Snackbar() {
	const [open, setOpen] = useState(false);
	const [data, setData] = useState({
		message: ''
	});
	const { t, i18n } = useTranslation();
	const { message, messageKey, errorCode, uuid } = data;

	const suffix = uuid ? ` Error ID: ${uuid}` : '';
	let finalMessage = messageKey ? t(messageKey) : message;

	if (errorCode) {
		finalMessage = i18n.exists(`errors.${toCamelCase(errorCode)}`)
			? t(`errors.${toCamelCase(errorCode)}`)
			: finalMessage;
	}

	finalMessage += suffix;

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		function handleShowSnackbar(event) {
			setOpen(true);
			setData(event.detail);
		}

		window.addEventListener('showSnackbar', handleShowSnackbar);

		return () => {
			window.removeEventListener('showSnackbar', handleShowSnackbar);
		};
	}, []);

	return (
		<MuiSnackbar
			open={open}
			autoHideDuration={data.duration || DURATION}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		>
			<Alert
				onClose={handleClose}
				severity={data.severity}
				sx={{
					width: '100%',
					backgroundColor: 'background.default',
					alignItems: 'center',
					minWidth: 340,
					border: 1,
					borderColor: 'divider',
					boxShadow: '0px 4px 6px 0px rgba(205, 209, 224, 0.50)',
					[`.${alertClasses.message}`]: {
						color: 'text.secondary',
						fontSize: 14
					},
					[`.${alertClasses.action}`]: {
						pt: 0
					},
					[`.${alertClasses.icon}`]:
						data.severity === 'success'
							? {
									color: '#BAD221'
								}
							: {}
				}}
			>
				{finalMessage}
			</Alert>
		</MuiSnackbar>
	);
}
