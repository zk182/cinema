import { useTranslation } from 'react-i18next';
import { IconButton, Dialog as MuiDialog } from '@mui/material';
import { CloseIcon } from '../Icons';

export function Dialog({ children, hasCross = true, ...props }) {
	const { t } = useTranslation();

	return (
		<MuiDialog {...props}>
			<div>
				{props.onClose && hasCross && (
					<IconButton
						aria-label={t('common.close')}
						onClick={props.onClose}
						sx={{
							position: 'absolute',
							right: 16,
							top: 16,
							color: 'text.primary'
						}}
					>
						<CloseIcon />
					</IconButton>
				)}
				{children}
			</div>
		</MuiDialog>
	);
}
