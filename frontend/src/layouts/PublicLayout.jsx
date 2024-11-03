import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { useDialog, usePageTitle } from '@/hooks';
import { TopNavbar } from '@/components/TopNavbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { fetchMe } from '@/store/auth/thunks';
import { AppDrawer } from '@/components/AppDrawer';
import { TopNavbarMenu } from '@/components/TopNavbar/TopNavbarMenu';
import { useMedia } from '@/hooks/responsive';

function Scroller() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [pathname]);
}

export function PublicLayout() {
	const dispatch = useDispatch();

	const { open, handleClose, handleOpen } = useDialog();
	const mdDown = useMedia('mdDown');

	usePageTitle();

	useEffect(() => {
		dispatch(fetchMe());
	}, []);

	return (
		<>
			<Scroller />
			<AuthModal />
			<TopNavbar onCloseMenu={handleClose} onOpenMenu={handleOpen} />
			{mdDown && (
				<AppDrawer open={open} onClose={handleClose} variant="temporary">
					<TopNavbarMenu
						direction="column"
						onClickItem={handleClose}
						showIcons
					/>
				</AppDrawer>
			)}

			<Outlet />

			<Footer />
		</>
	);
}
