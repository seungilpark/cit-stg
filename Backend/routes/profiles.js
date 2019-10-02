// handlers for application related request
//  works with profiles table 

/**
 * 
 */
const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/profilesDbConnector");



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

router.get("/:profileId", async (req, res) => {
    try {
        const profileId = req.params.profileId;
        let row = await db.getProfileById(profileId);
        res.json(row);
    }
    catch {
        res.json({"Error":"True"});
    }
})


module.exports = router;