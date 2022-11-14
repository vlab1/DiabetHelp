import Joi from 'joi';

const create = Joi.object({
    account_id: Joi.string().hex().length(24).required(),
    name:  Joi.string().required(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    account_id: Joi.string().hex().length(24),
    name:  Joi.string(),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const find = Joi.object({
    _id: Joi.string().hex().length(24),
    account_id: Joi.string().hex().length(24),
    name:  Joi.string(),
});


export default {
    create,
    update,
    delete0,
    find,
};
