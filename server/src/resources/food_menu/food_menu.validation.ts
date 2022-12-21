import Joi from 'joi';

const create = Joi.object({
    food_id: Joi.string().hex().length(24).required(),
    menu_id: Joi.string().hex().length(24).required(),
    foodModel: Joi.string().valid('Food', 'AccountFood').required(),
    count: Joi.number().required(),
    equiv_type: Joi.string().valid('presize', 'relative').required(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    food_id: Joi.string().hex().length(24),
    menu_id: Joi.string().hex().length(24),
    foodModel: Joi.string(),
    count: Joi.number(),
    equiv_type: Joi.string(),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const get = Joi.object({
    menu_id: Joi.string().hex().length(24),
});

const find = Joi.object({
    _id: Joi.string().hex().length(24),
    food_id: Joi.string().hex().length(24),
    menu_id: Joi.string().hex().length(24),
    count: Joi.number(),
    foodModel: Joi.string(),
    equiv_type: Joi.string(),
});

export default {
    create,
    update,
    delete0,
    get,
    find,
};
