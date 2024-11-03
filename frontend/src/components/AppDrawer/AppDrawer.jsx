import { useMedia } from '@/hooks/responsive';
import { Box, Drawer, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SignOutButton } from '../NavSidebarMenu/SignOutButton';
import { LoginButtons } from '../TopNavbar/LoginButtons';
import { Logo } from '../Logo';

export const APP_DRAWER_WIDTH = 280;
export const APP_DRAWER_WIDTH_MD_UP = 262;

export function AppDrawer({
	open,
	onClose,
	variant = 'permanent',
	children,
	showGradient
}) {
	const mdUp = useMedia('mdUp');
	const loggedIn = useSelector(state => state.auth.loggedIn);

	const gradientWidthPx = '10px';

	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={onClose}
			variant={variant}
			PaperProps={{
				sx: {
					bgcolor: 'common.white',
					border: 0,
					boxShadow: 'none',
					width: !mdUp ? APP_DRAWER_WIDTH : APP_DRAWER_WIDTH_MD_UP,
					pl: showGradient ? gradientWidthPx : 0
				}
			}}
		>
			{showGradient && (
				<Box
					width={gradientWidthPx}
					height="100%"
					sx={{
						bottom: 0,
						left: 0,
						position: 'absolute',
						right: 0,
						top: 0,
						background:
							'linear-gradient(180deg, #9747FF 0%, #F372C2 51%, #DFF265 100%)'
					}}
				/>
			)}
			<Stack
				direction="column"
				sx={{
					height: '100%',
					py: 3
				}}
			>
				<Box px={2} mb={4} flex={1}>
					<Box
						component={Link}
						to="/"
						sx={{ display: 'block', lineHeight: 0, mb: 3 }}
						onClick={onClose}
					>
						<Logo />
					</Box>

					{children}
				</Box>

				{!loggedIn ? (
					<LoginButtons
						direction="column"
						spacing={1}
						px={2}
						onClick={onClose}
					/>
				) : (
					<SignOutButton />
				)}
			</Stack>
		</Drawer>
	);
}
