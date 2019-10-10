const Joi = require("joi");

const schema = Joi.object().keys({
    athl_id:Joi.number(),
    account: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    athl_dob: Joi.date(),
    athl_email: Joi.string().email({ minDomainAtoms: 2 }),
    athl_phone:Joi.string(),
    athl_height:Joi.number(),
    athl_weight:Joi.weight(),
    athl_gender:Joi.string(),
    athl_fname:Joi.string(),
    athl_lname:Joi.string(),
    athl_addr:Joi.string(),
    city:Joi.string(),
    country:Joi.string()
})



module.exports = schema;

// const testSchema = Joi.object().keys({
//     name: Joi.string().required(),
//     id:Joi.number().required(),
//     desc:Joi.string()
// })


/* works */
// console.log(Joi.validate({name:"hello", id:123, desc:"nto required"}, testSchema).error);
// console.log(Joi.validate({name:"hello", id:123}, testSchema).error);
/* not works */
// console.log(Joi.validate({name:"hello"}, testSchema).error);
// console.log(Joi.validate({name:"hello", name2:"new key", id:123, desc:"nto required"}, testSchema).error);