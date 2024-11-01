import { Joi } from 'express-validation';

const baseUserRules = Joi.object({
	username: Joi.string().min(3).max(50).trim().required().lowercase(),
	email: Joi.string().trim().email().required().lowercase(),
	password: Joi.string().min(3).max(50).required()
});

export const createUserValidator = {
	body: baseUserRules
};

export const updateUserValidator = {
	body: Joi.object({
		email: Joi.string().trim().email().lowercase(),
		username: Joi.string().min(3).max(50).trim().lowercase(),
		password: Joi.string().min(3).max(50)
	})
};
