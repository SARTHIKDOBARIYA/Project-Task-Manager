import Joi from 'joi';

export const validate = (schema) => {
    return (req, res, next) => {

        const dataToValidate = {};

        if (schema.body) {
            dataToValidate.body = req.body || {};
        }

        if (schema.params) {
            dataToValidate.params = req.params;
        }

        if (schema.query) {
            dataToValidate.query = req.query;
        }

        const joiSchema = Joi.object(schema);

        const { error } = joiSchema.validate(dataToValidate, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error) {
            return res.status(400).json({
                errors: error.details.map(err => err.message)
            });
        }

        next();
    };
};