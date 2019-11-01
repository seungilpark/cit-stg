const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/likedClubsDbConnecter");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");

router.get('/', async (req, res) => {
    try {
        let results = await db.getAll();
        res.json(results);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});

router.get('/likes/:id', async (req, res) => {
    try {
        let input_id = req.params.id;
        const rows = await db.getLikesByAthleteId(input_id);
        res.json(rows)
        console.log(input_id)
    }
    catch(err) {
        res.json((`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`));
    }
})

module.exports = router;