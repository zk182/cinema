import {
	List,
	ListItemButton,
	ListItemIcon,
	Stack,
	Typography
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import routes from '@/routes';
import { AccountCircleIcon } from '@/components/Icons/AccountCircleIcon.jsx';
import { BackgroundReplaceIcon } from '@/components/Icons/BackgroundReplaceIcon.jsx';

const menuItems = [
	{
		id: 'cinema',
		label: 'pageTitles.cinema',
		path: routes.dashboard,
		icon: <BackgroundReplaceIcon />
	},
	{
		id: 'myAccount',
		label: 'pageTitles.myAccount',
		path: routes.myAccount,
		icon: <AccountCircleIcon />
	}
];

export function NavSidebarMenu({ onClose }) {
	const { t } = useTranslation();

	return (
		<List
			disablePadding
			sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}
		>
			{menuItems.map(item => {
				return (
					<ListItemButton
						key={item.id}
						LinkComponent={NavLink}
						to={item.path}
						onClick={onClose}
						sx={{
							minHeight: 40,
							borderRadius: 2,
							color: 'text.secondary',
							px: 1,
							'&.active': {
								bgcolor: 'primary.lightest',
								color: 'text.primary'
							}
						}}
					>
						<Stack direction="row" alignItems="center" width={1}>
							{!!item.icon && (
								<ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
									{item.icon}
								</ListItemIcon>
							)}
							<Typography
								sx={{
									fontWeight: 600,
									color: 'inherit'
								}}
							>
								{t(item.label)}
							</Typography>
						</Stack>
					</ListItemButton>
				);
			})}
		</List>
	);
}
