import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { TextFieldController } from '@/components/TextFieldController';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { LevelPassword } from '@/components/LevelPassword';
import { Button } from '@/components/Button';
import schemas from '@/validations';
import { fetchMe, signUp } from '@/store/auth/thunks';
import { AUTH_MODAL_TYPES, setAuthModalType } from '@/store/auth';
import { showError } from '@/utils';
import { useAuthLogin, useAuthSignUp } from '@/store/auth/selectors';
import routes from '@/routes';
import { useGetErrorMessage } from '@/hooks';
import { Description, FieldsWrapper, Title } from './components';
import { SuccessCheck } from '../Icons/SuccessCheckIcon';

const MIN_HEIGHT = 500;

export function SignUp() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const getErrorMessage = useGetErrorMessage();
	const redirectTo = useSelector(state => state.auth.authModalRedirect);

	const { success, loading, error } = useSelector(useAuthSignUp);
	const { loading: loggingIn, success: loggedIn } = useSelector(useAuthLogin);

	const form = useForm({
		resolver: yupResolver(schemas.signUp()),
		mode: 'onChange',
		defaultValues: {
			email: '',
			username: '',
			password: ''
		}
	});

	function onSubmit(values) {
		dispatch(signUp({ ...values }));
	}

	async function handleStart() {
		try {
			await dispatch(fetchMe()).unwrap();
			dispatch(setAuthModalType(''));
		} catch (err) {
			showError(err);
		}
	}

	if (success) {
		return (
			<Box minHeight={MIN_HEIGHT}>
				<Box color="#DFF265" lineHeight={0} mb={2}>
					<SuccessCheck style={{ width: 64, height: 'auto' }} />
				</Box>
				<Stack spacing={1}>
					<Title>{t('signUp.welcome')}</Title>
					<Description whiteSpace="pre-wrap">
						{t('signUp.successMessage')}
					</Description>
				</Stack>
				<Button
					component={Link}
					variant="contained"
					to={redirectTo || routes.dashboard}
					fullWidth
					sx={{
						mt: 4
					}}
					onClick={handleStart}
				>
					{t('common.start')}
				</Button>
			</Box>
		);
	}

	if (loggingIn) {
		return (
			<Box textAlign="center">
				<CircularProgress />
			</Box>
		);
	}

	if (loggedIn) {
		dispatch(setAuthModalType(''));
		return <Navigate to={routes.dashboard} />;
	}

	return (
		<Box minHeight={MIN_HEIGHT}>
			<Stack spacing={1}>
				<Title>{t('signUp.title')}</Title>
			</Stack>

			<Box py={1}>
				<Box component="form" py={1} onSubmit={form.handleSubmit(onSubmit)}>
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
								fullWidth
								control={form.control}
								id="username"
								name="username"
								placeholder={t('login.fields.username.placeholder')}
							/>
							<Stack spacing={3}>
								<TextFieldController
									control={form.control}
									fullWidth
									id="password"
									name="password"
									placeholder={t('login.fields.password.placeholder')}
									type="password"
								/>
								<LevelPassword password={form.watch('password')} />
							</Stack>
						</FieldsWrapper>
						<Stack textAlign="center" spacing={2}>
							<Button
								type="submit"
								variant="contained"
								loading={loading}
							>
								{t('common.signUp')}
							</Button>

							<Box>
								<Typography color="text.secondary" fontWeight="semi">
									{t('signUp.alreadyHaveAnAccount')}{' '}
									<Typography
										variant="button"
										color="text.primary"
										fontWeight="inherit"
										onClick={() =>
											dispatch(
												setAuthModalType(AUTH_MODAL_TYPES.LOGIN)
											)
										}
									>
										{t('common.login')}
									</Typography>
								</Typography>
							</Box>

							{error && (
								<Typography color="error">
									{getErrorMessage(error)}
								</Typography>
							)}

							<Typography color="text.secondary" variant="body0">
								{t('signUp.termsAndConditions')}{' '}
							</Typography>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
}
