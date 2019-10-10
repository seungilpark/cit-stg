const Joi = require("joi");

const schema = Joi.object().keys({
    app_id:Joi.number().integer(),
    date_created:Joi.date(),
    app_status:Joi.string().max(40),
    fk_profile_id:Joi.number().integer(),
    fk_offer_id:Joi.number().integer(),
})



module.exports = schema;
