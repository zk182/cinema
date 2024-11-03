import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routes from '@/routes';

import { Hero } from './Hero';

export function Home() {
	const user = useSelector(state => state.auth.user);

	if (user) {
		return <Navigate to={routes.dashboard} />;
	}

	return <Hero />;
}
