const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/athletesDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");


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

router.get('/location/:searchTerm', async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm;
        const row = await db.getAthlByLocation(searchTerm);
            res.json(row);
    }
    catch(err) {
        res.json(`{"Error":"True", "Message":${err}}`);
    }
});

router.get("/name/:searchTerm", async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm;
        const row = await db.getAthlByName(searchTerm);
            res.json(row);
    }
    catch(err) {
        res.json(`{"Error":"True", "Message":${err}}`);
    }
})

router.get("/sports/:sports", async (req, res) => {
    try {
        let sportsName = req.params.sports;
        const result = await db.getAthlBySportsName(sportsName);
        res.json(result);        
    }
    catch (err) {
        res.json(err);
    }
})


/* POST */
router.post("/register", async (req, res) => {
    try {
        /* TODO validate User */
        // console.log(req.body);
        console.log(req.body);
        let result = await db.createAthlete(req.body);
        res.json(result);
        // res.json(`{"Error":"False", "Content":${result}}`)
    }
    catch(err) {
        res.json(`{"Error":"True", "Message":${err}}`);
    }
});



module.exports = router;