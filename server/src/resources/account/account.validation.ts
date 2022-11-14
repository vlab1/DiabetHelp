import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required(),
    password_confirmation: Joi.any().equal(Joi.ref('password')).required(),
    //isPremium: Joi.boolean().valid(true, false).default(false).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required(),
});

const googleLogin = Joi.object({
    email: Joi.string().email().required(),
    passwordGoogle: Joi.string().min(6).required(),
    name: Joi.string().min(3).max(15).required(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24),
    name: Joi.string().min(3).max(15),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(15),
    passwordGoogle: Joi.string().min(3).max(15),
    birth_date: Joi.date(),
    sex: Joi.string(),
    diabetes_type: Joi.number(),
    localization: Joi.string(),
    // isPremium: Joi.boolean(),
    high_sugar: Joi.number(),
    low_sugar: Joi.number(),
    premiumExpires: Joi.date(),
});

const premiumRenew = Joi.object({
    days: Joi.number().integer().min(1).required(),
});

const updatePassword = Joi.object({
    password: Joi.string().min(6).required(),
    new_password: Joi.string().min(6).required(),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24),
});

export default { register, login, googleLogin, update, premiumRenew, updatePassword, delete0 };
