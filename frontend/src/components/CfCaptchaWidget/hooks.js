import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadCfTurnstileScript } from './utils';

export function useLoadCfTurnstileScript(ready = true) {
	useEffect(() => {
		if (ready) {
			loadCfTurnstileScript();
		}
	}, [ready]);
}

export function useCfTurnstileChallenge({ action, triggerOnMount = false }) {
	const language = useSelector(state => state.auth.language);
	const challengeTriggered = useRef(false);
	const [cfIdempotencyKey, setCfIdempotencyKey] = useState(null);
	const [cfChallengeCompleted, setCfChallengeCompleted] = useState(false);

	async function triggerChallenge() {
		if (challengeTriggered.current) {
			return;
		}
		challengeTriggered.current = true;

		await window.cfTurnstileLoaded;

		window.turnstile.render('#cf-turnstile-widget', {
			sitekey: import.meta.env.VITE_CF_TURNSTILE_SITE_KEY,
			theme: 'light',
			action,
			language,
			size: window.innerWidth < 330 ? 'compact' : 'normal',
			callback(response) {
				setCfChallengeCompleted(true);
				// setCfChallengeToken(response);
				setCfIdempotencyKey(null);
			},
			'error-callback': error => {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		});
	}

	useEffect(() => {
		if (triggerOnMount) {
			triggerChallenge();
		}
	}, []);

	return {
		cfChallengeCompleted,
		cfIdempotencyKey,
		setCfIdempotencyKey,
		triggerChallenge
	};
}
