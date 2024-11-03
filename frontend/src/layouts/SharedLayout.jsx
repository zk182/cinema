import { useDialog, usePageTitle, useScrollToTop } from '@/hooks';
import routes from '@/routes';

import bgColorsImage from '@/images/bg_colors.webp';

import { fetchMe } from '@/store/auth/thunks';
import {
	Backdrop,
	Box,
	CircularProgress,
	Container,
	useMediaQuery
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthMe } from '@/store/auth/selectors';
import { AuthModal } from '@/components/AuthModal';
import { TopNavbar } from '@/components/TopNavbar';
import { Footer } from '@/components/Footer';
import { APP_DRAWER_WIDTH_MD_UP, AppDrawer } from '@/components/AppDrawer';
import { NavSidebarMenu } from '@/components/NavSidebarMenu';

export function SharedLayout({ navbar = true }) {
	const dispatch = useDispatch();

	const authMe = useSelector(useAuthMe);

	const { open, handleClose, handleOpen } = useDialog();

	const location = useLocation();
	const isDashboard = location.pathname === routes.dashboard;
	const isEditor = location.pathname === routes.editor;
	const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'), {
		noSsr: true
	});

	useEffect(() => {
		if (!authMe.data && !authMe.loading) {
			dispatch(fetchMe());
		}
	}, []);

	useScrollToTop();
	usePageTitle();

	if (!authMe.data && authMe.loading) {
		return (
			<Backdrop open>
				<CircularProgress />
			</Backdrop>
		);
	}

	if (authMe.success) {
		return (
			<>
				{!mdUp && (
					<TopNavbar onCloseMenu={handleClose} onOpenMenu={handleOpen} />
				)}

				<Box
					sx={{
						display: 'flex',
						flex: '1 1 auto',
						maxWidth: '100%',
						pl: navbar && mdUp ? `${APP_DRAWER_WIDTH_MD_UP}px` : 0
					}}
				>
					{navbar && (
						<AppDrawer
							open={mdUp || open}
							onClose={handleClose}
							showGradient={mdUp}
							variant={mdUp ? 'permanent' : 'temporary'}
						>
							<NavSidebarMenu onClose={handleClose} />
						</AppDrawer>
					)}

					<Box
						py={10}
						width="100%"
						sx={{
							...(isDashboard && {
								background: `url(${bgColorsImage})`,
								backgroundPosition: 'center'
							})
						}}
					>
						<Container
							maxWidth="lg"
							sx={{
								...(isDashboard && {
									height: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								})
							}}
						>
							<Outlet />
						</Container>
					</Box>
				</Box>
			</>
		);
	}

	return (
		<>
			<AuthModal />
			<TopNavbar />

			{isEditor ? (
				<Container
					maxWidth="lg"
					sx={{
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						py: 10
					}}
				>
					<Outlet />
				</Container>
			) : (
				<Outlet />
			)}

			<Footer prefooter={false} />
		</>
	);
}
