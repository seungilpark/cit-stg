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


router.get('/:id', async (req, res) => {
    try {
        let club_id = req.params.id;
        let row = await db.getClubById(club_id);
        res.json(row);
        console.log("TESTING GET CALL")
    }
    catch {
        console.log("inside get")
        res.json({"Error":"True"});
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log("IN DELETE FUNCTION");
        let club_id = req.params.id;
        console.log(club_id)

        let deleted_club = await db.deleteClubById(club_id)
        .then(() => 'Row Deleted');
        
        res.json({"Message":"Deleted Row"});
    }
    catch {
        console.log("inside delete")
        res.json({"Error":"True"});
    }
})

module.exports = router;