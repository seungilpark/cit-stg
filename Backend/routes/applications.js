const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/applicationDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");
// 
const rootPath = config.RootPath; 


/**
 * return all applications  
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

router.get('/athlete/:athl_id', async (req, res) => {
    try {

        let rows = await db.getApplByAthlId(req.params.athl_id);
            // rows = await db.getApplByClubId(inputId);
        res.json(rows);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});

router.get('/club/:club_id', async (req, res) => {
    try {
        // let rows = await db.getApplByAthlId(inputId);
        let rows = await db.getApplByClubId(req.params.club_id);
        res.json(rows);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});



module.exports = router;