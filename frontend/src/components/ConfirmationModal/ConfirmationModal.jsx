import { useTranslation } from 'react-i18next';
import { Typography, Stack } from '@mui/material';
import { Dialog, DialogContent, dialogClasses } from '@/components/Dialog';
import { Button } from '@/components/Button';

export function ConfirmationModal({
	open,
	loading,
	onClose,
	onConfirm,
	text,
	confirmText,
	closeText,
	sx,
	...props
}) {
	const { t } = useTranslation();

	return (
		<Dialog
			open={open}
			sx={{
				...sx,
				[`.${dialogClasses.paper}`]: {
					width: '100%',
					pt: 4.5
				}
			}}
			maxWidth="xs"
			onClose={onClose}
			{...props}
		>
			<DialogContent>
				<Typography
					sx={{
						textAlign: 'center',
						fontSize: {
							xs: 14,
							sm: 16
						},
						fontWeight: 500,
						mb: 6
					}}
					color="neutral.700"
				>
					{text}
				</Typography>
				<Stack direction="row" justifyContent="center" spacing={2}>
					<Button fullWidth variant="outlined" onClick={onClose}>
						{closeText || t('common.cancel')}
					</Button>
					<Button
						fullWidth
						variant="contained"
						loading={loading}
						onClick={onConfirm}
					>
						{confirmText}
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}
