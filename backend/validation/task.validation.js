import Joi from 'joi'

export const createTask = {
    body:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        priority:Joi.string(),
        dueDate:Joi.date(),
        completed:Joi.boolean()
    })
}