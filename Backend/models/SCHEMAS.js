const Joi = require("joi");

const ATHLETES_SCHEMA = Joi.object().keys({
    athl_id:Joi.number(),
    account: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    athl_dob: Joi.date(),
    athl_email: Joi.string().email({ minDomainAtoms: 2 }),
    athl_phone:Joi.string(),
    athl_height:Joi.number(),
    athl_weight:Joi.number(),
    athl_gender:Joi.string(),
    athl_fname:Joi.string(),
    athl_lname:Joi.string(),
    athl_addr:Joi.string(),
    city:Joi.string(),
    country:Joi.string()
})

const CLUB_MANAGERS_SCHEMA = Joi.object().keys({
    mgr_id:Joi.number().integer(),
    mgr_fname:Joi.string().max(40),
    mgr_lname:Joi.string().max(120),
    mgr_email:Joi.string().max(40),
    mgr_phone:Joi.string().max(40),
    fk_clubs_id:Joi.number().integer(),
    mgr_account:Joi.string().min(3).max(40),
    mgr_password:Joi.string().min(3).max(40),
})


const CLUBS_SCHEMA = Joi.object().keys({
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

const SPORTS_SCHEMA = Joi.object().keys({
    sports_id:Joi.number().integer(),
    sports_name:Joi.string().max(40),
    sports_type:Joi.string().max(40),
})

const OFFERS_SCHEMA = Joi.object().keys({
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

const PROFILES_SCHEMA = Joi.object().keys({
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


const APPLICATIONS_SCHEMA = Joi.object().keys({
    app_id:Joi.number().integer(),
    date_created:Joi.date(),
    app_status:Joi.string().max(40),
    fk_profile_id:Joi.number().integer(),
    fk_offer_id:Joi.number().integer(),
})


module.exports = {
    ATHLETES_SCHEMA,
    CLUB_MANAGERS_SCHEMA,
    CLUBS_SCHEMA,
    SPORTS_SCHEMA,
    OFFERS_SCHEMA,
    PROFILES_SCHEMA,
    APPLICATIONS_SCHEMA

};