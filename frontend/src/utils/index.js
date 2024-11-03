import { supportedLanguages } from '@/i18next';

export * from './snackbar';
export * from './style';

/**
 * @param {string} string
 * @return {string}
 */
export function capitalize([first, ...rest]) {
	return `${first.toUpperCase()}${rest.join('')}`;
}

export function toCamelCase(string) {
	return string.replace(/[_-]([a-z])/g, letter => letter[1].toUpperCase());
}

export function getPathLanguage() {
	const [firstPart] = window.location.pathname.split('/')[1];
	return supportedLanguages.includes(firstPart) ? firstPart : null;
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have
 * elapsed since the last time the debounced function was invoked.
 * @param {function} fn - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {function} The new debounced function.
 */
export function debounce(fn, wait) {
	let timerID;
	function debounced(...params) {
		const context = this;

		clearTimeout(timerID);
		timerID = setTimeout(fn.bind(context), wait, ...params);
	}

	return debounced;
}
