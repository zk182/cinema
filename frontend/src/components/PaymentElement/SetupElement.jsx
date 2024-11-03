import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { usePaymentMethod } from '@/hooks';
import {
	PaymentElement as StripePaymentElement,
	useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/Button';
import ErrorPayment from './ErrorPayment';
import { usePaymentCardErrors } from './utils';

function SetupElement({
	onSubmit,
	onBackFromError,
	onReady,
	onLoadedStripeElements,
	newError = null,
	onCancelSetupIntent,
	intent = null,
	isUpdate = null,
	processingPayment,
	stripe
}) {
	const [savingPaymentDetails, setSavingPaymentDetails] = useState(false);

	const { t } = useTranslation();

	const elements = useElements();
	const paymentMethod = usePaymentMethod();

	const [
		{ error, genericError },
		{ handleError, resetGenericError, setGenericError }
	] = usePaymentCardErrors();

	const countriesWithTerms = [];
	const customValidation = countriesWithTerms.includes(i18next.language);

	async function handleSubmit(ev) {
		ev.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		try {
			setSavingPaymentDetails(true);
			await onSubmit(stripe, elements);
		} catch (err) {
			handleError(err);
		}

		setSavingPaymentDetails(false);
	}

	useEffect(() => {
		if (newError) {
			handleError(newError);
		} else {
			setGenericError(null);
		}
	}, [newError]);

	useEffect(() => {
		if (elements) {
			onLoadedStripeElements(elements);
		}
	}, [elements]);

	const checkoutMessage = t('checkout.finishPurchase');

	const updateMessage = t('common.accept');

	if (!intent) {
		return null;
	}

	return (
		<>
			{genericError && (
				<ErrorPayment
					onBack={() => {
						resetGenericError();
						onBackFromError();
					}}
				/>
			)}
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					borderRadius: 6,
					position: 'relative',
					paddingRight: isUpdate ? 0 : { md: '25px' },
					display: genericError ? 'none' : 'block !important'
				}}
			>
				<StripePaymentElement
					id="stripe-payment-element"
					options={{
						fields: {
							billingDetails: 'never'
						},
						terms: {
							card: customValidation ? 'never' : 'always'
						}
					}}
					onReady={onReady}
					onChange={e => {
						if (!processingPayment) {
							localStorage.setItem(
								'lastPaymentMethodSelected',
								e?.value?.type || ''
							);
						}
					}}
				/>

				{error && (
					<Typography variant="body1" color="error.main" sx={{ mp: 0 }}>
						{error}
					</Typography>
				)}
				<Stack
					direction="row"
					justifyContent={
						paymentMethod.hasPaymentMethod ? 'space-between' : 'flex-end'
					}
					gap={1}
					sx={{ mt: 5 }}
				>
					{paymentMethod.hasPaymentMethod && (
						<Button
							type="button"
							color="primary"
							variant="outlined"
							onClick={onCancelSetupIntent}
						>
							{t('common.cancel')}
						</Button>
					)}
					<Button
						type="submit"
						variant="contained"
						loading={savingPaymentDetails}
					>
						{paymentMethod.hasPaymentMethod
							? updateMessage
							: checkoutMessage}
					</Button>
				</Stack>
			</Box>
		</>
	);
}

export default SetupElement;
