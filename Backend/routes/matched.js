const express = require('express');
const router = express.Router();
const recRepo = require("../dbConnectors/generateList");
const dbHelper = require("../dbConnectors/DbHelper");

/**
 * return all matched clubs and athletes for athletes view
 */
router.get('/athlete/:athl_id', async (req, res) => {
    try {
        let results = await recRepo.getMatchedByAthlId(req.params.athl_id);
        res.json(results);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});

/**
 * return all matched clubs and athletes for athletes view
 */
router.get('/club/:club_id', async (req, res) => {
    try {
        // let results = await recRepo.getMatchedByAthlId(req.params.athl_id);
        res.json(results);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});

module.exports = router;