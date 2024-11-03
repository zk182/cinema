import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { storage } from '@/utils/browser';
import en from '../locales/en.json';

import LazyImportPlugin from './lazy-import-plugin';

export const DEFAULT_LANGUAGE = 'en';

const resources = {
	en: {
		translation: en
	}
};

export const supportedLanguages = ['en'];

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
	name: 'user',
	lookup() {
		return storage.get('user')?.language;
	}
});

i18n
	.use(LazyImportPlugin)
	.use(initReactI18next)
	.use(languageDetector)
	.init({
		fallbackLng: DEFAULT_LANGUAGE,
		resources,
		partialBundledLanguages: true,
		supportedLngs: supportedLanguages,

		interpolation: {
			escapeValue: false // react already safes from xss
		},
		react: {
			useSuspense: false
		},
		detection: {
			order: ['path', 'user', 'localStorage', 'navigator'],
			lookupLocalStorage: 'language',
			convertDetectedLanguage(lng) {
				const parsed = (lng || '').split(/-|_/)[0].trim().toLowerCase();

				if (parsed === 'no') {
					return 'nb';
				}
				return parsed;
			}
		}
	});

export default i18n;
