import * as Yup from 'yup';

const passwordSchema = Yup.string().min(3).max(20);

const schemas = {
	login() {
		return Yup.object({
			email: Yup.string().email().required(),
			password: passwordSchema.required()
		});
	},
	signUp() {
		return Yup.object({
			email: Yup.string().email().required(),
			username: Yup.string().min(3).max(50).trim().lowercase().required(),
			password: passwordSchema.required()
		});
	},
	contactInformation() {
		return Yup.object({
			username: Yup.string().required(),
			email: Yup.string().email().required()
		});
	},
	changePassword() {
		return Yup.object({
			password: passwordSchema.required()
		});
	},
	resetPassword(t) {
		return Yup.object({
			password: passwordSchema.required(),
			repeatPassword: Yup.string()
				.oneOf([Yup.ref('password')], t('validations.samePassword'))
				.required()
		});
	}
};

export default schemas;
