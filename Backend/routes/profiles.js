const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/profilesDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");


/**
 * return all profiles  
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

router.get("/:profileId", async (req, res) => {
    try {
        const profileId = req.params.profileId;
        let row = await db.getProfileById(profileId);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})

router.post("/create", async (req, res) => {
    try {
        let validation =joi.validate(req.body,SCHEMAS.PROFILES_SCHEMA).error 
        if (validation) throw new Error(validation);
        let result = await dbHelper.insertInto("profiles", req.body);
        res.json(result);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})

router.get("/athlete/:athl_id", async (req, res) => {
    try {
        const athl_id = req.params.athl_id;
        let row = await db.getProfileByAthlId(athl_id);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})


module.exports = router;