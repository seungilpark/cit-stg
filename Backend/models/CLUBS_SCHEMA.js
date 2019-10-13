const Joi = require("joi");

const schema = Joi.object().keys({
    club_id:Joi.number().integer(),
    club_name:Joi.string().max(40),
    club_location:Joi.string().max(120),
    club_size:Joi.string().max(40),
    club_status:Joi.string().max(40),
    club_url:Joi.string().max(40),
    club_contact:Joi.string().max(40),
    fk_sports_id:Joi.number().integer(),
    street_name:Joi.string().max(120),
    city:Joi.string().max(120),
    country:Joi.string().max(120),
})



module.exports = schema;
