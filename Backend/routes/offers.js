const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/offersDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");


/**
 * return all offers  
 */
router.get('/', async (req, res) => {
    try {
        let results = await db.getAll();
        res.json(results);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});

router.get("/:offerId", async (req, res) => {
    try {
        const offerId = req.params.offerId;
        let row = await db.getOfferById(offerId);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})


router.post("/create", async (req, res) => {
    try {
        let validation =joi.validate(req.body,SCHEMAS.OFFERS_SCHEMA).error 
        if (validation) throw new Error(validation);
        let result = await dbHelper.insertInto("offers", req.body);
        res.json(result);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})


module.exports = router;