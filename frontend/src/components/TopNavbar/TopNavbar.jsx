import { Box, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { useMedia } from '@/hooks/responsive';
import { Logo } from '../Logo';
import { TopNavbarMenu } from './TopNavbarMenu';
import { MenuIcon } from '../Icons';
import { LoginButtons } from './LoginButtons';

export const TOP_NAV_HEIGHT = 64;

export function TopNavbar({ onCloseMenu, onOpenMenu, ...props }) {
	const xs = useMedia('xs');
	const mdDown = useMedia('mdDown');

	return (
		<Box
			component="header"
			sx={{
				bgcolor: 'common.white',
				position: 'sticky',
				top: 0,
				zIndex: 1000
			}}
			{...props}
		>
			<Stack
				alignItems="center"
				direction="row"
				justifyContent="space-between"
				spacing={2}
				sx={{
					minHeight: TOP_NAV_HEIGHT,
					px: {
						xs: 2,
						md: 4
					}
				}}
			>
				<Stack
					alignItems="center"
					direction="row"
					height="100%"
					justifyContent="space-between"
					spacing={{ xs: 0, md: 2 }}
					width="100%"
				>
					<Link to="/" style={{ lineHeight: 0 }}>
						<Logo iso={xs} />
					</Link>

					{mdDown ? (
						<IconButton onClick={onOpenMenu} aria-label="Open menu">
							<MenuIcon />
						</IconButton>
					) : (
						<>
							<TopNavbarMenu />
							<LoginButtons />
						</>
					)}
				</Stack>
			</Stack>
		</Box>
	);
}
