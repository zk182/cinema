import { Joi } from 'express-validation';

export const loginValidator = {
	body: Joi.object({
		email: Joi.string().trim().email().required().lowercase(),
		password: Joi.string().min(3).max(50).required()
	})
};

export const sendCodeValidator = {
	body: Joi.object({
		email: Joi.string().email().required()
	})
};

export const resetPasswordValidator = {
	body: Joi.object({
		token: Joi.string().required(),
		password: Joi.string().max(255).required()
	})
};

export const changePasswordValidator = {
	body: Joi.object({
		password: Joi.string().max(255).required()
	})
};
