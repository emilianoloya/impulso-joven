//Import validation dependencies
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
                .min(6)
                .required()
    });
    validation = schema.validate(data);
    return validation
};

module.exports.registerValidation = registerValidation;