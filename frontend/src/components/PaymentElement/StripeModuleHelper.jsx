import { useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

function StripeModuleHelper({ onLoadStripe }) {
	const stripe = useStripe();

	useEffect(() => {
		onLoadStripe(stripe);
	}, [stripe]);
	return null;
}

export default StripeModuleHelper;
