import Joi from 'joi';

const get = Joi.object({
    menu_id: Joi.string().hex().length(24).required(),
});

export default {
    get,
};
