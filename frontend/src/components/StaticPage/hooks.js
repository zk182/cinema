import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import en from '@/legal-locales/en';
import { setLegalsReady } from '@/store/auth';
import { useLanguage } from '@/hooks';
import { DEFAULT_LANGUAGE } from '@/i18next';

const messagesCache = {
	en
};

const messagesLoader = {
	es: () => import('@/legal-locales/es')
};

export function useStaticTexts(key) {
	const locale = useLanguage();
	const dispatch = useDispatch();
	const [messages, setMessages] = useState(
		messagesCache[locale] || messagesCache[DEFAULT_LANGUAGE]
	);

	useEffect(() => {
		dispatch(setLegalsReady(false));

		if (messagesCache[locale]) {
			dispatch(setLegalsReady());
			return setMessages(messagesCache[locale]);
		}

		messagesLoader[locale]()
			.then(({ default: newMessages }) => {
				setMessages(newMessages);
				dispatch(setLegalsReady());
			})
			.catch(error => {
				console.error(error);
				dispatch(setLegalsReady());
			});
	}, [locale]);

	return messages[key] || {};
}
