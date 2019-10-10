const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/athletesDbConnector");



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
 * returns athlete by athlete' id 
 */
router.get('/:id', async (req, res) => {
    try {
        let athl_id = req.params.id;
        const row = await db.getAthlById(athl_id);
            res.json(row);
    }
    catch(err) {
        res.json(`{"Error":"True", "Message":${err}}`);
    }
});



/**
 * deletes athlete by id
 */
router.post('/delete/:id', async (req, res) => {
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
})





module.exports = router;