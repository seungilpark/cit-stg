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

/**
 * Returns sport by ID specified
 */
router.get("/:sportsId", async (req, res) => {
    try {
        const sportsId = req.params.sportsId;
        let row = await db.getSportsById(sportsId);
        res.json(row);
    }
    catch {
        res.json({"Error":"True"});
    }
});

/**
 * Returns information about the sport by name
 */
router.get("/name/:sportName", async (req, res) => {
    try {
        //console.log("Inside get by sportname")
        const sportName = req.params.sportName;
        //console.log(sportName);
        let fetched_sport = await db.getSportsByName(sportName)
        
        res.json(fetched_sport);
    }
    catch {
        console.log("Inside get by sports name error");
        res.json({"Error":"True"});
    }
});


module.exports = router;