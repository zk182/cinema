import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/components/Button';
import { login } from '@/store/auth/thunks';
import { TextFieldController } from '@/components/TextFieldController';
import { useAuthLogin } from '@/store/auth/selectors';
import schemas from '@/validations';
import routes from '@/routes';
import { AUTH_MODAL_TYPES, clearMe, setAuthModalType } from '@/store/auth';
import { useGetErrorMessage } from '@/hooks';
import { Description, FieldsWrapper, Title } from './components';

export function Login() {
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const getErrorMessage = useGetErrorMessage();
	const redirectTo = useSelector(state => state.auth.authModalRedirect);

	const { success, loading, error } = useSelector(useAuthLogin);

	const errorMessage =
		error?.status === 401
			? t('login.credentialsError')
			: getErrorMessage(error);

	const form = useForm({
		resolver: yupResolver(schemas.login()),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	function onSubmit(values) {
		dispatch(login({ ...values }));
	}

	if (success) {
		dispatch(setAuthModalType(''));
		dispatch(clearMe());
		return <Navigate to={redirectTo || routes.dashboard} />;
	}

	return (
		<Box>
			<Stack spacing={1}>
				<Title>{t('login.title')}</Title>
				<Description>{t('login.description')}</Description>
			</Stack>
			<Box py={1}>
				<Box py={1} component="form" onSubmit={form.handleSubmit(onSubmit)}>
					<Stack spacing={2}>
						<FieldsWrapper>
							<TextFieldController
								fullWidth
								control={form.control}
								id="email"
								name="email"
								placeholder={t('login.fields.email.placeholder')}
							/>
							<TextFieldController
								control={form.control}
								fullWidth
								id="password"
								name="password"
								placeholder={t('login.fields.password.placeholder')}
								type="password"
							/>
						</FieldsWrapper>

						<Stack spacing={2}>
							<Typography color="text.secondary" fontWeight="semi">
								{t('login.forgotPassword')}{' '}
								<Typography
									variant="button"
									color="text.primary"
									fontWeight="inherit"
									onClick={() =>
										dispatch(
											setAuthModalType(
												AUTH_MODAL_TYPES.RECOVER_PASSWORD
											)
										)
									}
								>
									{t('common.clickHere')}
								</Typography>
							</Typography>
							<Button
								loading={loading}
								type="submit"
								variant="contained"
							>
								{t('common.login')}
							</Button>

							{errorMessage && (
								<Typography color="error.main">
									{errorMessage}
								</Typography>
							)}

							{/* <Box>
								<Typography color="text.secondary" fontWeight="semi">
									{t('login.dontHaveAnAccount')}{' '}
									<Typography
										variant="button"
										color="text.primary"
										fontWeight="inherit"
										onClick={() =>
											dispatch(
												setAuthModalType(AUTH_MODAL_TYPES.SIGN_UP)
											)
										}
									>
										{t('common.signUp')}
									</Typography>
								</Typography>
							</Box> */}
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
}
