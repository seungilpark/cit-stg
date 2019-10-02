const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const pool = require("../config/database");
const config = require("../config/config");



// 
const rootPath = config.RootPath; 


/**
 * return all athletes  
 */
router.get('/', (req, res) => {
    try {
        let rows; 
        pool.query("select * from athletes", (err, results, fields) => {
            
            if (err) {
                console.error(err);
                throw new Error(err);
            } 

            rows = results;
            res.json(rows);
        })
    }
    catch(err) {
        res.send(err);
    }
});

/**
 * returns athlete by athlete' id 
 */
router.get('/:id', function (req, res) {
    try {

        let rows, query; 
        let inputId = req.body.id;
        let queryType = req.body.queryType;
        if (queryType == "athlete") query=
            `select * 
            from applications as a 
            inner join profiles as p
            on a.fk_profile_id=p.profile_id
            inner join athletes as athl
            on p.fk_athl_id = athl.athl_id
            where athl.athl_id=${inputId}`

        else if (queryType == "club") query=
            `select * 
            from applications as a 
            inner join offers as o
            on a.fk_offer_id=o.offer_id
            inner join clubs as c
            on c.club_id = o.fk_club_id
            where c.club_id=${inputId}`;


        pool.query(query, (err, results, fields) => {        
            if (err) throw err;
            rows = results;
            res.json(rows);
        });
    }
    catch(err) {
        res.send(err);
    }
});



module.exports = router;