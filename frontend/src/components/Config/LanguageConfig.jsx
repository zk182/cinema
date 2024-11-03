import { useLanguage } from '@/hooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageConfig() {
	const language = useLanguage();
	const { i18n } = useTranslation();

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [language]);

	return null;
}
