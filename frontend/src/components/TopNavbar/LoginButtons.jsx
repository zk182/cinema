import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AUTH_MODAL_TYPES, setAuthModalType } from '@/store/auth';

import { useTranslation } from 'react-i18next';
import { Button } from '../Button';

export function LoginButtons({ direction = 'row', spacing = 2, ...props }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	return (
		<Stack
			alignItems="center"
			direction={direction}
			spacing={spacing}
			{...props}
		>
			<Button
				variant="text"
				color="secondary"
				fullWidth={direction === 'column'}
				onClick={() => dispatch(setAuthModalType(AUTH_MODAL_TYPES.LOGIN))}
			>
				{t('common.login')}
			</Button>
			<Button
				fullWidth={direction === 'column'}
				variant="outlined"
				onClick={() => dispatch(setAuthModalType(AUTH_MODAL_TYPES.SIGN_UP))}
			>
				{t('common.signUp')}
			</Button>
		</Stack>
	);
}
