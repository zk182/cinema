import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';

import { SITE_NAME } from '@/config';
import { toCamelCase } from '@/utils';

export * from './user';
export * from './redux';

export function useScrollToTop(options) {
	useEffect(() => {
		window.scrollTo({ top: 0, ...options });
	}, []);
}

export function usePageTitle() {
	const { t, i18n } = useTranslation();
	const matches = useMatches();

	useEffect(() => {
		let title = '';
		for (const match of matches) {
			const localeKey = `pageTitles.${match.id}`;
			if (match.id && i18n.exists(localeKey)) {
				title = t(localeKey);
				break;
			}
		}
		document.title = title || SITE_NAME;
	}, [matches]);
}

export function useAnimatedBackground(images = [], transition = 5000) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
		}, transition);

		return () => clearInterval(interval);
	}, []);

	return images.at(currentIndex);
}

export function useGetErrorMessage(mapping) {
	const { t, i18n } = useTranslation();

	return error => {
		if (!error) {
			return '';
		}

		const errorCode = toCamelCase(error.data?.errorCode || '');

		if (mapping?.[errorCode]) {
			return mapping[errorCode];
		}

		return errorCode && i18n.exists(`errors.${errorCode}`)
			? t(`errors.${errorCode}`)
			: t('errors.generic');
	};
}

export function useDialog(initialState = false) {
	const [open, setOpen] = useState(initialState);

	const handleOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	return { handleClose, handleOpen, open };
}
