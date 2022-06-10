//Import validation dependencies
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string()
            .required(),
        lastname: Joi.string()
                    .required(),
        secondlastname: Joi.string()
                        .required(),
        phonenumber: Joi.string()
                    .min(9)
                    .max(10)
                    .required(),
        username: Joi.string()
                .min(6)
                .required(),
        email: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
                .min(6)
                .required()
    });
    validation = schema.validate(data);
    return validation;
};

module.exports.registerValidation = registerValidation;