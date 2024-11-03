import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContactInformationForm } from '@/pages/private/my-account/ContactInformationForm.jsx';
import { useAuthMe } from '@/store/auth/selectors';
import { fetchMe } from '@/store/auth/thunks';
import { PageLayout } from '@/components/PageLayout';
import { ChangePasswordForm } from './ChangePasswordForm';
import { TABS } from './constants';

export function MyAccount() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const authMe = useSelector(useAuthMe);
	const dispatch = useDispatch();

	const [view, setView] = useState(
		() => location.state?.tab || TABS.GENERAL_INFORMATION
	);

	useEffect(() => {
		// clear location state
		navigate(location.pathname, { replace: true });

		if (!authMe.loading) {
			dispatch(fetchMe());
		}
	}, []);

	return (
		<PageLayout title={t('pageTitles.myAccount')}>
			<Tabs value={view} onChange={(_, v) => setView(v)}>
				<Tab
					value={TABS.GENERAL_INFORMATION}
					label={t('myAccount.generalInformation')}
				/>
			</Tabs>
			<Box
				sx={{
					width: '100%',
					maxWidth: '590px',
					mt: {
						xs: 4,
						md: 7
					}
				}}
			>
				{view === TABS.GENERAL_INFORMATION && (
					<Stack spacing={{ xs: 5, md: 7 }}>
						<ContactInformationForm />
						<ChangePasswordForm />
					</Stack>
				)}
			</Box>
		</PageLayout>
	);
}
