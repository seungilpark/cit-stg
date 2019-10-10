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


module.exports = router;