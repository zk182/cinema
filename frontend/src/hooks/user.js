import { useSelector } from 'react-redux';

export function useLanguage() {
	return useSelector(state => state.auth.language);
}
