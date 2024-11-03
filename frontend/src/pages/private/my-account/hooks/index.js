import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import schemas from '@/validations/index.js';
import { useCallback } from 'react';
import userModel from '@/models/user';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthMe } from '@/store/auth/selectors.js';
import { fetchMe } from '@/store/auth/thunks.js';
import { showSuccess } from '@/utils';

export function useChangePassword() {
	const { t } = useTranslation();
	const { control, formState, getValues, handleSubmit } = useForm({
		resolver: yupResolver(schemas.changePassword()),
		mode: 'onChange'
	});

	const onSubmit = useCallback(
		async function () {
			const { password } = getValues();
			await userModel.update({ password });
			showSuccess(t('myAccount.changePassword.success'));
		},
		[getValues]
	);

	return {
		control,
		onSubmitEnabled: formState.isValid && !formState.isSubmitting,
		onSubmit: handleSubmit(onSubmit)
	};
}

export function useUpdateContactInformation() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const authMe = useSelector(useAuthMe);
	const { username, email } = authMe.data ?? {};
	const { control, formState, getValues, handleSubmit } = useForm({
		resolver: yupResolver(schemas.contactInformation()),
		mode: 'onChange',
		defaultValues: {
			username,
			email
		}
	});

	const onSubmit = useCallback(
		async function () {
			const values = getValues();
			await userModel.update(values);
			showSuccess(t('myAccount.contactInformation.success'));
			dispatch(fetchMe());
		},
		[getValues, dispatch, fetchMe]
	);

	return {
		control,
		onSubmitEnabled: formState.isValid && !formState.isSubmitting,
		onSubmit: handleSubmit(onSubmit)
	};
}
