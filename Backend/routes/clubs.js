const express = require('express');
const router = express.Router();
const db = require("../dbConnectors/clubsDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");

/**
 * return all clubs  
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


router.get('/:clubId', async (req, res) => {
    try {
        let clubId = req.params.clubId;
        let row = await db.getClubById(clubId);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})


/* POST */

router.post("/create", async (req, res) => {
    try {
        let validation =joi.validate(req.body,SCHEMAS.CLUBS_SCHEMA).error;
        if (validation) throw new Error(validation);
        let result = await dbHelper.insertInto("clubs", req.body);
        res.json(result);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})

module.exports = router;