import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useLoadCfTurnstileScript } from '@/components/CfCaptchaWidget';
import {
	AUTH_MODAL_TYPES,
	clearAuthModalData,
	setAuthModalType
} from '@/store/auth';
import { useMedia } from '@/hooks/responsive';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { RecoverPassword } from './RecoverPassword';
import { ChangePassword } from './ChangePassword';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../Icons';

export function AuthModal() {
	const { t } = useTranslation();
	const authModalType = useSelector(state => state.auth.authModalType);
	const dispatch = useDispatch();
	const [lastOpen, setLastOpen] = useState(authModalType);
	const type = authModalType || lastOpen;
	const open = !!authModalType;

	const smDown = useMedia('smDown');

	useEffect(() => {
		if (authModalType) {
			return setLastOpen(authModalType);
		}
		setTimeout(() => {
			setLastOpen(null);
		}, 200);
	}, [authModalType]);

	useLoadCfTurnstileScript(open);

	useEffect(() => {
		if (!authModalType) {
			setTimeout(() => {
				dispatch(clearAuthModalData());
			}, 200);
		}
	}, [authModalType]);

	const handleClose = () => {
		dispatch(setAuthModalType(null));
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="xl"
			fullScreen={smDown}
		>
			{smDown && (
				<IconButton
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: ({ spacing }) => spacing(1.5),
						top: ({ spacing }) => spacing(1.5)
					}}
				>
					<CloseIcon sx={{ color: 'text.secondary' }} />
				</IconButton>
			)}
			<Stack
				component={DialogContent}
				direction="row"
				width="100%"
				alignItems="center"
				textAlign="center"
				sx={{
					px: 3,
					pt: 6,
					pb: 6
				}}
			>
				<Stack
					spacing={2}
					width={{
						xs: '100%',
						md: 330
					}}
					mx="auto"
				>
					<Box display="flex" justifyContent="center" pb={1} />

					{type === AUTH_MODAL_TYPES.LOGIN && <Login />}
					{type === AUTH_MODAL_TYPES.SIGN_UP && <SignUp />}
					{type === AUTH_MODAL_TYPES.RECOVER_PASSWORD && (
						<RecoverPassword />
					)}
					{type === AUTH_MODAL_TYPES.CHANGE_PASSWORD && <ChangePassword />}

					<Box mt={2}>
						<Typography textAlign="center" color="text.disabled">
							{t('copyright', {
								company: 'Nicolas',
								year: new Date().getFullYear()
							})}
						</Typography>
					</Box>
				</Stack>
			</Stack>
		</Dialog>
	);
}
