const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const pool = require("../config/database");
const config = require("../config/config");
const db = require("../dbConnectors/applicationDbConnector");


// 
const rootPath = config.RootPath; 


/**
 * return all applications  
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
 * returns applications by athlete' id or club_id
 *  used for athletes who would want to see all the application he has applied
 *  used for club managers who would want to see all the applications their clubs have received
 * 
 * @input 
 *  req.body.queryType (athlete | club)
 *  req.body.id is
 *      if queryType == athlete, athl_id
 *      if queryType == club, club id
 * 
 * @output
 *  applications
 */
router.post('/', async (req, res) => {
    try {
        let inputId = req.body.id;
        let queryType = req.body.queryType;
        let rows;
        
        if (queryType == "athlete"){
            rows = await db.getApplByAthlId(inputId);
        }
        else if (queryType == "club"){
            rows = await db.getApplByClubId(inputId);
        } else {
            rows = null;
        }
        res.json(rows);
    }
    catch(err) {
        console.log(err);
        res.code(400).send(err);
    }
});



module.exports = router;