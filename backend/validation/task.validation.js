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

export const updateTask = {
    query:Joi.object({
        id:Joi.string().required(),
    }),
    body:Joi.object({
        title:Joi.string(),
        description:Joi.string(),
        priority:Joi.string(),
        dueDate:Joi.date(),
        completed:Joi.boolean()
    })
}

export const getTask = {
    query: Joi.object({
        id: Joi.string().required(),
    })
};

export const removeTask = {
    query: Joi.object({
        id: Joi.string().required(),
    })
};