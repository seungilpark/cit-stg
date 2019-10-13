const Joi = require("joi");

const schema = Joi.object().keys({
    sports_id:Joi.number().integer(),
    sports_name:Joi.string().max(40),
    sports_type:Joi.string().max(40),
})



module.exports = schema;
