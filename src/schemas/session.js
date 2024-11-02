import { Joi } from 'express-validation';

export const getStatusValidator = {
	params: Joi.object().keys({
		id: Joi.number().required()
	})
};

export const reserveValidator = {
	body: Joi.object({
		seatsId: Joi.array().items(Joi.number().required()).required()
	}),
	params: Joi.object().keys({
		id: Joi.number().required()
	})
};
