import Joi from 'joi';

const create = Joi.object({
    glucose: Joi.number(),
    comment: Joi.string(),
    date: Joi.date().default(Date.now),
    weight: Joi.number(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    glucose: Joi.number(),
    comment: Joi.string(),
    date: Joi.date(),
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
    weight: Joi.number(),
});

const adminGet = Joi.object({
    account_id: Joi.string().hex().length(24),
});
export default {
    create,
    update,
    delete0,
    find,
    adminGet,
};
