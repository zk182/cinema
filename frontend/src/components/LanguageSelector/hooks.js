import { useMemo } from 'react';
import { useLanguage } from '@/hooks';
import { supportedLanguages } from '@/i18next';
import { capitalize } from '@/utils';

export function useLanguageOptions() {
	const language = useLanguage();

	return useMemo(() => {
		const displayName = new Intl.DisplayNames([language], {
			type: 'language'
		});

		return supportedLanguages.map(lng => ({
			value: lng,
			label: capitalize(displayName.of(lng) || '')
		}));
	}, [language]);
}

export function useDisplayLanguage() {
	const language = useLanguage();

	const displayName = useMemo(() => {
		return new Intl.DisplayNames([language], {
			type: 'language'
		});
	}, [language]);

	return value => capitalize(displayName.of(value) || '');
}
