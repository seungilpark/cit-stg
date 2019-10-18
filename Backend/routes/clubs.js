const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/clubsDbConnector");



/**
 * return all clubs  
 */
router.get('/', async (req, res) => {
    try {
        let results = await db.getAll();
        res.send(results);
    }
    catch(err) {
        console.log(err);
        res.code(400).send(err);
    }
});


router.get('/:clubId', async (req, res) => {
    try {
        let clubId = req.params.clubId;
        let row = await db.getClubById(clubId);
        res.json(row);
    }
    catch {
        res.json({"Error":"True"});
    }
})

module.exports = router;
