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

/**
 * Returns a club by id
 */

router.get('/:id', async (req, res) => {
    try {
        let club_id = req.params.id;
        let row = await db.getClubById(club_id);
        res.json(row);
        //console.log("IN GET FUNCTION")
    }
    catch {
        console.log("inside get")
        res.json({"Error":"True"});
    }
});

/**
 * Returns a list of clubs in a specified location either by city or country
 */
router.get('/location/:location', async (req, res) => {
    try {
        let loc = req.params.location;
        let fetched_rows =  await db.getClubsByLocation(loc)
        
        res.json(fetched_rows);
        //console.log("Inside get club by location");
    }
    catch {
        //console.log("Inside get club by location error");
        res.json({"Error":"True"});
    }
});

/**
 * Returns club with the name specified
 */
router.get('/name/:name', async (req, res) => {
    try {
        let club_name = req.params.name;

        let club = await db.getClubsByName(club_name)
        
        res.json(club)
    }
    catch {
        res.json({"Error":"True"});
    }
})

/**
 * Deletes club by id
 */
router.post("/delete/:id", async (req, res) => {
    try {
        //console.log(req.params.id);
        console.log("IN DELETE FUNCTION");
        let club_id = req.params.id;
        console.log(club_id)

        let deleted_club = await db.deleteClubById(club_id)
        .then(() => 'Row Deleted');
        
        res.json({"Message":"Deleted Row"});
    }
    catch {
        //console.log("inside delete")
        res.json({"Error":"True"});
    }
});

module.exports = router;