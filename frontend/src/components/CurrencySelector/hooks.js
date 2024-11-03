import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrency } from '@/store/auth';
import { fetchCurrencies } from '@/store/auth/thunks';

export function useCurrencySelector({
	fetchOnOpen,
	prices = [],
	selfState,
	onChange: onChangeProp
}) {
	const dispatch = useDispatch();

	const { currency, currencies, fetchingCurrencies, currenciesReady } =
		useSelector(state => ({
			currency: state.auth.currency,
			currencies: state.auth?.fetchCurrencies?.data || [],
			fetchingCurrencies: state.auth?.fetchCurrencies?.loading || false,
			currenciesReady: state.auth?.fetchCurrencies?.success || false
		}));
	const [currencyValue, setCurrencyValue] = useState(currency);
	const currencyState = selfState ? currencyValue : currency;

	const [open, setOpen] = useState(false);
	const planCurrency = useMemo(() => {
		if (currencyState) {
			return null;
		}
		return prices.find(price => price.active)?.currency;
	}, [currencyState, prices]);

	function onChange(value) {
		onChangeProp?.(value);

		if (selfState) {
			return setCurrencyValue(value);
		}

		dispatch(setCurrency(value));
	}

	useEffect(() => {
		if (!currencies.length || !currencyState) {
			return;
		}
		if (!currencies.includes(currencyState)) {
			onChange(null);
		}
	}, [currencies.length]);

	useEffect(() => {
		if (currenciesReady || (fetchOnOpen && !open)) {
			return;
		}

		dispatch(fetchCurrencies());
	}, [open, currenciesReady]);

	return {
		currencies,
		planCurrency,
		currency: currencyState,
		fetchingCurrencies,
		open,
		setOpen,
		onChange,
		currenciesReady
	};
}
