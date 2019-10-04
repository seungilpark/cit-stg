// handlers for application related request
//  works with profiles table 
const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/sportsDbConnector");



/**
 * return all athletes  
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

router.get("/:sportsId", async (req, res) => {
    try {
        const sportsId = req.params.sportsId;
        let row = await db.getProfileById(sportsId);
        res.json(row);
    }
    catch {
        res.json({"Error":"True"});
    }
})


module.exports = router;