const Joi = require("joi");

const schema = Joi.object().keys({
    profile_id:Joi.number().integer(),
    position:Joi.string().max(40),
    coaches:Joi.string().max(40),
    profile_video:Joi.string().max(40),
    profile_photo:Joi.string().max(45),
    medical_info:Joi.string().max(40),
    organization:Joi.string().max(40),
    biography:Joi.string().max(40),
    fk_sports_id:Joi.number().integer(),
    fk_athl_id:Joi.number().integer(),
})



module.exports = schema;
