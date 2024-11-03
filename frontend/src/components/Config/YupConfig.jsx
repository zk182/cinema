import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export function YupConfig() {
	const { t, i18n } = useTranslation();
	const firstRender = useRef(true);

	function loadLocale() {
		Yup.setLocale({
			mixed: {
				required: t('validations.mixed.required')
			},
			string: {
				min: t('validations.string.min'),
				max: t('validations.string.max'),
				email: t('validations.string.email')
			}
		});
	}

	if (firstRender.current) {
		firstRender.current = false;

		loadLocale();
	}

	useEffect(() => {
		// ignore first render
		if (firstRender.current) {
			return;
		}

		loadLocale();
	}, [i18n.language]);

	return null;
}
