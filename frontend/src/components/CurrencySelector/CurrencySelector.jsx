import { useTranslation } from 'react-i18next';
import {
	Box,
	CircularProgress,
	MenuItem,
	Select as MuiSelect
} from '@mui/material';

import { useCurrencySelector } from './hooks';
import { ChevronDownIcon } from '../Icons';

export function CurrencySelector({
	disabled,
	prices = [],
	fetchOnOpen = false,
	SelectComponent = MuiSelect,
	selfState,
	onChange: onChangeProp,
	...props
}) {
	const { t } = useTranslation();
	const {
		open,
		setOpen,
		currency,
		planCurrency,
		currencies = [],
		fetchingCurrencies,
		onChange
	} = useCurrencySelector({
		fetchOnOpen,
		prices,
		selfState,
		onChange: onChangeProp
	});

	return (
		<SelectComponent
			displayEmpty
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			value={currency || planCurrency || ''}
			renderValue={value => {
				if (value) {
					return value.toUpperCase();
				}

				return t('common.currency');
			}}
			style={{ minWidth: 100 }}
			disabled={disabled}
			IconComponent={ChevronDownIcon}
			{...props}
		>
			<Box style={{ width: '100%', maxHeight: 200, overflow: 'auto' }}>
				{fetchingCurrencies && (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center'
						}}
					>
						<CircularProgress size={30} />
					</Box>
				)}
				{currencies.map(currencyValue => (
					<MenuItem
						key={currencyValue}
						onClick={() => onChange(currencyValue)}
						value={currencyValue}
					>
						{currencyValue.toUpperCase()}
					</MenuItem>
				))}
			</Box>
		</SelectComponent>
	);
}
