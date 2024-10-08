const Joi = require('joi');

// const registerCoupleSchema = Joi.object({
//     username: Joi.string().min(4).alphanum().required().messages({
//         'string.min': 'Username must be at least 4 characters long',
//         'string.alphanum': 'Username must contain only alphanumeric characters',
//     }),

const registerCoupleSchema = Joi.object({
    username: Joi.string()
        .pattern(/^(?![_\-&.])[a-zA-Z0-9._\-&]{4,30}(?<![_\-&.])$/)
        .required()
        .messages({
            'string.pattern.base': 'Username must be 4-30 characters long and can only contain letters, numbers, dots, underscores, hyphens, and ampersands, but cannot start or end with special characters',
        }),

    phone_number: Joi.string()
        .pattern(/^\+?[0-9]{10,11}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must include country code and be 10 to 11 digits long'
        }),

    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long'
    })
});

const updateCoupleSchema = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().email().optional().messages({
        'string.email': 'Email must be a valid email address'
    }),
    
    phone_number: Joi.string()
        .pattern(/^(\+?\d{1,3})?\d{10,11}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must include country code and be 10 to 11 digits long'
        }),
});

module.exports = {
    registerCoupleSchema,
    updateCoupleSchema
};
