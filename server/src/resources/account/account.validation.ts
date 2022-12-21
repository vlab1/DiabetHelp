import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().min(3).max(35).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(35).required(),
    password_confirmation: Joi.any().equal(Joi.ref('password')).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(35).required(),
});

const googleLogin = Joi.object({
    email: Joi.string().email().required(),
    passwordGoogle: Joi.string().min(6).required(),
    name: Joi.string().min(3).max(15).required(),
});

const update = Joi.object({
    name: Joi.string().min(3).max(35),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(15),
    passwordGoogle: Joi.string().min(3).max(15),
    birth_date: Joi.date(),
    sex: Joi.string(),
    diabetes_type: Joi.number(),
    // localization: Joi.string(),
    high_sugar: Joi.number(),
    low_sugar: Joi.number(),
    phone: Joi.string()
        .length(16)
        .pattern(/^[0-9 +]+$/),
    premiumExpires: Joi.date(),
});

const premiumRenew = Joi.object({
    days: Joi.number().integer().min(1).required(),
    key: Joi.string().required(),
});

const payment = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    days: Joi.number().integer().min(1).required(),
    key: Joi.string().required(),
});


const updatePassword = Joi.object({
    password: Joi.string().min(6).required(),
    new_password: Joi.string().min(6).required(),
});

const adminUpdateRole = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    role: Joi.string().valid('User', 'Admin').required(),
});

const adminDelete = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const adminFind = Joi.object({
    _id: Joi.string().hex().length(24),
    name: Joi.string().min(3).max(35),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(15),
    passwordGoogle: Joi.string().min(3).max(15),
    birth_date: Joi.date(),
    sex: Joi.string(),
    diabetes_type: Joi.number(),
    // localization: Joi.string(),
    high_sugar: Joi.number(),
    low_sugar: Joi.number(),
    phone: Joi.string()
        .length(16)
        .pattern(/^[0-9]+$/),
    premiumExpires: Joi.date(),
    role: Joi.string(),
});

const adminCreate = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(35).required(),
    password: Joi.string().min(3).max(15).required(),
    birth_date: Joi.date(),
    sex: Joi.string(),
    diabetes_type: Joi.number(),
    // localization: Joi.string(),
    high_sugar: Joi.number(),
    low_sugar: Joi.number(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    premiumExpires: Joi.date(),
});

const adminGet = Joi.object({
    email: Joi.string(),
});

export default {
    register,
    login,
    googleLogin,
    update,
    premiumRenew,
    updatePassword,
    adminUpdateRole,
    adminDelete,
    adminFind,
    adminGet,
    adminCreate,
    payment
};


