import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes';

import { PrivateLayout, PublicLayout } from '@/layouts';
import { Dashboard } from '@/pages/private/dashboard';
import { MyAccount } from '@/pages/private/my-account';
import { Home } from '@/pages/public/home';
import { ChangePasswordRedirect } from '@/pages/ChangePasswordRedirect';
import NotFound from '@/pages/NotFound';

// IMPORTANT: define the route id for setting the document title automatically
const router = createBrowserRouter([
	{
		path: '/',
		element: <PublicLayout />,
		children: [
			{
				path: '/',
				element: <Home />
			}
		]
	},
	{
		path: '/',
		element: <PrivateLayout />,
		children: [
			{
				id: 'dashboard',
				path: routes.dashboard,
				element: <Dashboard />
			},
			{
				id: 'myAccount',
				path: routes.myAccount,
				element: <MyAccount />
			}
		]
	},
	{
		path: routes.changePassword,
		element: <ChangePasswordRedirect />
	},
	{
		path: '*',
		element: <PublicLayout />,
		children: [{ path: '*', element: <NotFound /> }]
	}
]);

function Router() {
	return <RouterProvider router={router} />;
}

export default Router;
