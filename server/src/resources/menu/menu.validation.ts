import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    name: Joi.string(),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const find = Joi.object({
    _id: Joi.string().hex().length(24),
    account_id: Joi.string().hex().length(24),
    name: Joi.string(),
});

const calculator = Joi.object({
    menu_id: Joi.string().hex().length(24).required(),
});

const adminGet = Joi.object({
    account_id: Joi.string().hex().length(24),
});
export default {
    create,
    update,
    delete0,
    find,
    calculator,
    adminGet,
};
