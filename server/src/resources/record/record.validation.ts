import Joi from 'joi';

const create = Joi.object({
    glucose: Joi.number(),
    comment: Joi.string(),
    date: Joi.date().default(Date.now),
    account_id: Joi.string().hex().length(24),
    weight: Joi.number(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    glucose: Joi.number(),
    comment: Joi.string(),
    date: Joi.date(),
    account_id: Joi.string().hex().length(24),
    weight: Joi.number(),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const find = Joi.object({
    _id: Joi.string().hex().length(24),
    glucose: Joi.number(),
    comment: Joi.string(),
    date: Joi.date(),
    account_id: Joi.string().hex().length(24),
    weight: Joi.number(),
});

export default {
    create,
    update,
    delete0,
    find,
};
