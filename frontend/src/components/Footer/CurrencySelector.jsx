import { useTranslation } from 'react-i18next';

import { CurrencySelector as BaseCurrencySelector } from '@/components/CurrencySelector';
import { Box } from '@mui/system';
import { Select } from './Select';
import { CurrencyIcon } from '../Icons/CurrencyIcon';

function formatCurrency(currency) {
	return currency.toUpperCase();
}

export function CurrencySelector() {
	const { t } = useTranslation();

	return (
		<BaseCurrencySelector
			SelectComponent={Select}
			style={{ minWidth: 0 }}
			inputProps={{
				'aria-label': t('common.currency')
			}}
			renderValue={value => {
				return (
					<Box display="flex" alignItems="center" gap="4px">
						<CurrencyIcon />
						{!value && t('common.currency')}
						{value && formatCurrency(value)}
					</Box>
				);
			}}
		/>
	);
}
