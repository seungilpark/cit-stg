const Joi = require("joi");

const schema = Joi.object().keys({
    offer_id:Joi.number().integer(),
    offer_position:Joi.string().max(40),
    offer_amount:Joi.string().max(40),
    offer_desc:Joi.string().max(400),
    offer_photo:Joi.string().max(45),
    offer_types:Joi.string().max(40),
    offer_length:Joi.string().max(40),
    fk_club_id:Joi.number().integer(),
    offer_title:Joi.string().max(40),
})



module.exports = schema;
