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


// router.get('/:id', async (req, res) => {
//     try {

//         let club_id = req.params.id;
//         let row = await db.getClubById(club_id);
//         res.json(row);
//         //console.log("TESTING GET CALL")
//     }
//     catch {
//         //console.log("inside get")
//         res.json({"Error":"True"});
//     }
// });

router.post('/update/:id/', async (req, res) => {
    try {
        console.log(req.body.club_name);
        //console.log("IN DELETE FUNCTION");
        let club_id = req.params.id;
        let club_body = req.body
        
        //console.log(club_id)

        let update_club = await db.updateClubById(club_body, club_id)
        .then(() => 'Row updated');
        
        res.json({"Message":"Updated Row"});
    }
    catch {
        console.log("inside delete")
        res.json({"Error":"True"});
    }
});


router.post('/delete/:id', async (req, res) => {
    try {
        //console.log(req.params.id);
        //console.log("IN DELETE FUNCTION");
        let club_id = req.params.id;
        //console.log(club_id)

        let deleted_club = await db.deleteClubById(club_id)
        .then(() => 'Row Deleted');
        
        res.json({"Message":"Deleted Row"});
    }
    catch {
        console.log("inside delete")
        res.json({"Error":"True"});
    }
});


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