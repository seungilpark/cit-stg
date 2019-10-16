const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/sportsDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");

/**
 * return all athletes  
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

/**
 * Returns sport by ID specified
 */
router.get("/:sportsId", async (req, res) => {
    try {
        const sportsId = req.params.sportsId;
        let row = await db.getSportsById(sportsId);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})

router.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        let validation =joi.validate(req.body,SCHEMAS.SPORTS_SCHEMA).error 
        if (validation) throw new Error(validation);
        let result = await dbHelper.insertInto("sports", req.body);
        res.json(result);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
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