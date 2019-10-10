const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/sportsDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");

/**
 * return all athletes  
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

router.get("/:sportsId", async (req, res) => {
    try {
        const sportsId = req.params.sportsId;
        let row = await db.getSportsById(sportsId);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})

router.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        let validation =joi.validate(req.body,SCHEMAS.SPORTS_SCHEMA).error 
        if (validation) throw new Error(validation);
        let result = await dbHelper.insertInto("sports", req.body);
        res.json(result);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})


module.exports = router;