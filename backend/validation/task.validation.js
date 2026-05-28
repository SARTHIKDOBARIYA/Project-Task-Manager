import Joi from 'joi'

export const createTask = Joi.object({
    body:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        priority:Joi.string(),
        dueDate:Joi.date(),
        completed:Joi.boolean()
    })
})

export const updateTask = Joi.object({
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
})

export const getTask = Joi.object({
    query: Joi.object({
        id: Joi.string().required(),
    })
});

export const removeTask = Joi.object({
    query: Joi.object({
        id: Joi.string().required(),
    })
});