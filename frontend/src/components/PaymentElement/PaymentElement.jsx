import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import stripePromise from '@/modules/stripe';
import stripeModel, {
	PAYMENT_INTENT_STATUS,
	PAYMENT_METHOD_TYPE
} from '@/models/stripe';
import { useTaxInformation, usePaymentMethod } from '@/hooks';
import { setPaymentMethod } from '@/store/auth';

import { Box, CircularProgress, Radio, Stack } from '@mui/material';
import { Button } from '@/components/Button';

import visaLogo from '@/images/cards/card_visa.svg';
import masterLogo from '@/images/cards/card_master.svg';
import discoverLogo from '@/images/cards/card_discover.png';
import amexLogo from '@/images/cards/card_amex.svg';
import dinersLogo from '@/images/cards/card_diners.svg';
import paypalLogo from '@/images/cards/paypal.svg';
import unionPayLogo from '@/images/cards/union_pay.svg';
import sepaDebitLogo from '@/images/cards/sepa_debit_card.svg';

import SetupElement from './SetupElement';
import ErrorPayment from './ErrorPayment';
import ProcessingModal from './ProcessingModal';
import StripeModuleHelper from './StripeModuleHelper';

import { useProcessingModal } from './utils';

const logos = {
	mastercard: masterLogo,
	visa: visaLogo,
	sepa_debit: sepaDebitLogo,
	amex: amexLogo,
	discover: discoverLogo,
	diners: dinersLogo,
	paypal: paypalLogo,
	unionpay: unionPayLogo
};

function PaymentElement({
	onSavedPaymentMethod = () => null,
	onSetupErr = () => null,
	onLoadStripeModule = () => null,
	onCancelPaymentMethodChange = () => null,
	onOpenSetupIntent = () => null,
	clientSecret = null,
	isUpdate = false,
	currentPlan = null
}) {
	const [stripe, setStripe] = useState(null);
	const [elements, setElements] = useState(null);
	const [lockChangePm, setLockChangePm] = useState(false);
	const [fetchingSetupIntent, setFetchingSetupIntent] = useState(false);
	const [renderingSetupElement, setRenderingSetupElement] = useState(true);
	const [setupIntentErr, setSetupIntentErr] = useState(null);
	const [setupIntent, setSetupIntent] = useState(null);
	const [newError, setNewError] = useState(null);
	const [processingPayment, setProcessingPayment] = useState(false);
	const [processingPaymentMethod, setProcessingPaymentMethod] = useState('');

	const [
		{
			shouldProcessSetupIntent,
			data: { redirectStatus, setupIntentClientSecret, setupIntentParam }
		},
		{ cleanState }
	] = useProcessingModal();

	const { t } = useTranslation();

	const dispatch = useDispatch();

	const { data: billingData = {} } = useTaxInformation();

	const paymentMethod = usePaymentMethod();

	async function fetchSetupIntent() {
		try {
			setSetupIntent(null);
			setFetchingSetupIntent(true);
			setRenderingSetupElement(true);

			const response = await stripeModel.createSetupIntent(
				currentPlan?.name
			);

			setSetupIntent(response);
		} catch (err) {
			setSetupIntentErr(err);
		}

		setFetchingSetupIntent(false);
	}

	async function onSubmit() {
		setLockChangePm(true);
		const { error: confirmError, setupIntent: setupIntentResponse } =
			await stripe.confirmSetup({
				elements,
				redirect: 'if_required',
				confirmParams: {
					return_url: window.location.href,
					payment_method_data: {
						billing_details: {
							email: billingData.email,
							name: billingData.name || '',
							phone: billingData.phone || '',
							address: {
								country: (billingData.country || 'es').toUpperCase(),
								postal_code: billingData.zip || '',
								state: '',
								city: billingData.city || '',
								line1: billingData.street || '',
								line2: ''
							}
						}
					}
				}
			});

		if (confirmError) {
			setLockChangePm(false);
			throw confirmError;
		}

		try {
			const response = await stripeModel.getNewPaymentMethod(
				setupIntentResponse.payment_method
			);

			if (response) {
				dispatch(setPaymentMethod(response));
			}
		} catch (err) {
			/*
				Don't throw anything, this call is used to check if user payment method was updated with current one.
			*/
		}

		setSetupIntent(null);
		setRenderingSetupElement(false);

		await onSavedPaymentMethod(stripe, elements, setupIntentResponse);
		setLockChangePm(false);
	}

	async function handleSofort() {
		if (
			paymentMethod?.info.stripePaymentMethodType ===
				PAYMENT_METHOD_TYPE.PAYPAL ||
			!shouldProcessSetupIntent ||
			!stripe ||
			!elements
		) {
			return;
		}

		try {
			setProcessingPayment(true);
			setLockChangePm(true);
			const { setupIntent: setupIntentResponse } =
				await stripe.retrieveSetupIntent(setupIntentClientSecret);

			if (setupIntentResponse.status !== PAYMENT_INTENT_STATUS.SUCCEEDED) {
				let error;
				if (
					setupIntentResponse.last_setup_error?.payment_method?.type ===
					PAYMENT_METHOD_TYPE.PAYPAL
				) {
					error = new Error();
					error.code =
						setupIntentResponse.last_setup_error?.decline_code || '';
					error.decline_code =
						setupIntentResponse.last_setup_error?.decline_code;
					error.type = setupIntentResponse.last_setup_error?.type;
					error.extended_code = `paypal_${error.type}`;
				}

				cleanState();
				onSetupErr(setupIntentResponse);
				setLockChangePm(false);
				setProcessingPayment(false);
				return setNewError(error || new Error('Failed to setup.'));
			}

			try {
				const response = await stripeModel.getNewPaymentMethod(
					setupIntentResponse.payment_method
				);

				if (response) {
					dispatch(setPaymentMethod(response));
					if (
						response.stripePaymentMethodType ===
						PAYMENT_METHOD_TYPE.PAYPAL
					) {
						setSetupIntent(null);
						setProcessingPayment(false);
						return setLockChangePm(false);
					}
					setProcessingPaymentMethod(
						response.stripeParentPaymentMethodType
					);
				}
			} catch (err) {
				/*
					Don't throw anything, this call is used to check if user payment method was updated with current one.
				*/
			}

			await onSavedPaymentMethod(stripe, elements, setupIntentResponse);
			setLockChangePm(false);
		} catch (err) {
			setNewError(err);
			setLockChangePm(false);
		}
		setProcessingPayment(false);
	}

	useEffect(() => {
		if (!paymentMethod.hasPaymentMethod) {
			fetchSetupIntent();
		} else {
			setRenderingSetupElement(false);
		}
	}, [paymentMethod.hasPaymentMethod]);

	// Handle sofort and other redirect-based payments.
	useEffect(() => {
		handleSofort();
	}, [shouldProcessSetupIntent, stripe, elements]);

	function onBackFromError() {
		setNewError(null);
		setLockChangePm(false);
		fetchSetupIntent();
	}

	const showLoader =
		fetchingSetupIntent || renderingSetupElement || processingPayment;

	const pmLogo =
		logos[paymentMethod.info.stripePaymentMethodBrand] ||
		logos[paymentMethod.info.stripePaymentMethodType];

	function onChangePm() {
		setRenderingSetupElement(true);
		fetchSetupIntent();
		onOpenSetupIntent();
	}

	function handleCancelSetupIntent() {
		setSetupIntent(null);
		onCancelPaymentMethodChange();
	}

	if (setupIntentErr) {
		return <ErrorPayment onBack={fetchSetupIntent} />;
	}

	return (
		<>
			<ProcessingModal
				open={
					!!(
						(paymentMethod?.info.stripePaymentMethodType ||
							// fallback last stored payment method selected, in case the user is not updated yet
							localStorage.getItem('lastPaymentMethodSelected')) !==
							PAYMENT_METHOD_TYPE.PAYPAL &&
						redirectStatus &&
						setupIntentClientSecret &&
						setupIntentParam &&
						!newError
					)
				}
				paymentMethod={processingPaymentMethod}
				text={t('checkout.processingMessage')}
			/>
			{showLoader && (
				<Box
					display="flex"
					sx={{
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						minHeight: 150
					}}
				>
					<CircularProgress />
				</Box>
			)}
			{paymentMethod.hasPaymentMethod && !setupIntent && !showLoader && (
				<>
					<Stack
						direction="row"
						alignItems="center"
						alignContent="center"
						sx={theme => ({
							border: `solid 2px ${theme.palette.primary.main}`,
							borderRadius: 6,
							width: '100%',
							padding: '5px 20px',
							paddingLeft: 5
						})}
					>
						<Radio checked variant="contained" />
						<Box color="neutral.600" sx={{ ml: 1 }}>
							{paymentMethod.info.stripePaymentMethodType ===
							PAYMENT_METHOD_TYPE.CARD
								? `**** **** **** ${paymentMethod.info.stripePaymentMethodLast4}`
								: ''}
						</Box>
						<img
							style={{ maxWidth: 49, marginLeft: 'auto' }}
							src={pmLogo}
							alt="card"
						/>
					</Stack>
					<Button
						color="primary"
						sx={theme => ({
							mt: 2,
							border: `dashed 2px ${theme.palette.neutral[500]}`,
							background: 'transparent',
							borderRadius: 4,
							width: '100%',

							'&:hover': {
								background: 'transparent'
							}
						})}
						onClick={onChangePm}
						disabled={lockChangePm}
					>
						{`+ ${t('checkout.addPaymentMethod')}`}
					</Button>
				</>
			)}
			<Elements
				key={
					setupIntent?.clientSecret ||
					clientSecret ||
					setupIntentClientSecret
				}
				stripe={stripePromise}
				options={
					setupIntent?.clientSecret ||
					clientSecret ||
					setupIntentClientSecret
						? {
								clientSecret:
									setupIntent?.clientSecret ||
									clientSecret ||
									setupIntentClientSecret
							}
						: {}
				}
			>
				<StripeModuleHelper
					onLoadStripe={value => {
						setStripe(value);
						onLoadStripeModule(value);
					}}
				/>
				{(setupIntent || clientSecret || setupIntentClientSecret) && (
					<Box
						sx={{
							display:
								showLoader && (setupIntent || processingPayment)
									? 'none'
									: 'initial'
						}}
					>
						<SetupElement
							onCancelSetupIntent={handleCancelSetupIntent}
							onSubmit={onSubmit}
							setupIntentErr={setupIntentErr}
							onBackFromError={onBackFromError}
							onReady={() => {
								setRenderingSetupElement(false);
							}}
							onLoadedStripeElements={elementsObj => {
								setElements(elementsObj);
							}}
							newError={newError}
							intent={setupIntent}
							isUpdate={isUpdate}
							processingPayment={processingPayment}
							stripe={stripe}
						/>
					</Box>
				)}
			</Elements>
		</>
	);
}

export default PaymentElement;
