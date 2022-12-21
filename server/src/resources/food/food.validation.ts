import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    presize_equiv: Joi.number(),
    relative_equiv: Joi.number(),
    presize_equiv_unit: Joi.string(),
    relative_equiv_unit: Joi.string(),
    presize_equiv_gCHO: Joi.number(),
    relative_equiv_gCHO: Joi.number(),
    type: Joi.string().required(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    name: Joi.string(),
    presize_equiv: Joi.number(),
    relative_equiv: Joi.number(),
    presize_equiv_unit: Joi.string(),
    relative_equiv_unit: Joi.string(),
    presize_equiv_gCHO: Joi.number(),
    relative_equiv_gCHO: Joi.number(),
    type: Joi.string(),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const find = Joi.object({
    _id: Joi.string().hex().length(24),
    name: Joi.string(),
    presize_equiv: Joi.number(),
    relative_equiv: Joi.number(),
    presize_equiv_unit: Joi.string(),
    relative_equiv_unit: Joi.string(),
    presize_equiv_gCHO: Joi.number(),
    relative_equiv_gCHO: Joi.number(),
    type: Joi.string(),
});

export default {
    create,
    update,
    delete0,
    find,
};
