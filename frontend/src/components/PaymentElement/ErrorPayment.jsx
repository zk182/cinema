import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { Button } from '@/components/Button';

function ErrorPayment({ onBack }) {
	const { t } = useTranslation();

	return (
		<Stack alignItems="center" gap={2} sx={{ pt: 3, pb: 5 }}>
			<Typography variant="h5">{t('errors.generic')}</Typography>
			<Button color="secondary" variant="contained" onClick={onBack}>
				{t('common.retry')}
			</Button>
		</Stack>
	);
}

export default ErrorPayment;
