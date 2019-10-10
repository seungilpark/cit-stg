const Joi = require("joi");

const schema = Joi.object().keys({
    mgr_id:Joi.number().integer(),
    mgr_fname:Joi.string().max(40),
    mgr_lname:Joi.string().max(120),
    mgr_email:Joi.string().max(40),
    mgr_phone:Joi.string().max(40),
    fk_clubs_id:Joi.number().integer(),
    mgr_account:Joi.string().min(3).max(40),
    mgr_password:Joi.string().min(3).max(40),
})



module.exports = schema;
