const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/athletesDbConnector");
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
 * returns athlete by athlete' id 
 */
router.get('/:id', async (req, res) => {
    try {
        let athl_id = req.params.id;
        const row = await db.getAthlById(athl_id);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});

router.get('/location/:searchTerm', async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm;
        const row = await db.getAthlByLocation(searchTerm);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }

});

router.get("/name/:searchTerm", async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm;
        const row = await db.getAthlByName(searchTerm);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});

router.get("/sports/:sports", async (req, res) => {
    try {
        let sportsName = req.params.sports;
        const result = await db.getAthlBySportsName(sportsName);
        res.json(result);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});


/* POST */
router.post("/register", async (req, res) => {
    try {
        /* TODO validate User */
        // console.log(req.body);
        // should first validate account/password
        // check if account already exsits
        // check if the password is correct
        console.log(req.body);
        // let result = await db.createAthlete(req.body);

        let validation =joi.validate(req.body,SCHEMAS.ATHLETES_SCHEMA).error; 
        if (validation) throw new Error(validation);
        let result = await dbHelper.insertInto("athletes", req.body);
        res.json(result);

    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);

    }
});

router.post('/update/:id/', async (req, res) => {
    try {
        console.log(req.body.athl_dob);
        //console.log("IN DELETE FUNCTION");
        let athlete_id = req.params.id;
        let athlete_body = req.body
        
        //console.log(club_id)

        let update_Athlete = await db.updateAthleteById(athlete_body, athlete_id)
        .then(() => 'Row updated');
        
        res.json({"Message":"Updated Row"});
    }
    catch (err){
        console.log(err)
        res.json({"Error":"True"});
    }
});


/**
 * deletes athlete by id
 */
router.post("/delete/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        //console.log("IN DELETE FUNCTION");
        let athl_id = req.params.id;
        console.log(athl_id)

        let deleted_athlete = await db.deleteAthleteById(athl_id)
        .then(() => 'Row Deleted');
        
        res.json({"Message":"Deleted Row"});
    }
    catch {
        //console.log("inside delete")
        res.json({"Error":"True"});
    }
});

router.post("/signin", async (req, res) => {
    try {

        let result = await db.verifyAthlete(req.body.account, req.body.password);
		console.log('good');
        if (result.length > 0 ) res.status(203).json(result); 
        else res.status(403).json({message:"cannot verify the user"});
    }
    catch(err) {
        res.json(err);
    }
})



module.exports = router;