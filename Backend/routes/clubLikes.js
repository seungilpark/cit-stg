const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/likesAndDislikes");
const dbHelper = require("../dbConnectors/DbHelper");

/* 
 * /athlLike/likes/:athl_id 
 * returns an array of offer ids
 */
router.get('/likes/:id', async (req, res) => {
    try {
        let club_id = req.params.id;
        console.log(club_id)
        const rows = await db.getClubLikes(club_id);
        res.json(rows)
    }
    catch(err) {
        res.json((`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`));
    }
})

router.get('/dislikes/:id', async (req, res) => {
    try {
        let club_id = req.params.id;
        console.log(club_id)
        const rows = await db.getClubDislikes(club_id);
        res.json(rows)
    }
    catch(err) {
        res.json((`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`));
    }
})

router.post('/like', async (req, res) => {
    try {
        let club_id = req.body.club_id;
        let athl_id = req.body.athl_id;
        const result = await db.insertClubLikes(club_id, athl_id);
        res.json(result);
    }
    catch(err) {
        res.json(err);
    }
})

router.post('/likes', async (req, res) => {
    try {
        let club_id = req.body.club_id;
        let athl_id_arr = req.body.athl_id_arr;
        const result = await db.insertManyClubLikes(club_id, athl_id_arr);
        res.json(result);
    }
    catch(err) {
        res.json(err);
    }
})

router.post('/dislike', async (req, res) => {
    try {
        let club_id = req.body.club_id;
        let athl_id = req.body.athl_id;
        const result = await db.insertClubDislikes(club_id, athl_id);
        res.json(result);
    }
    catch(err) {
        res.json(err);
    }
})

router.post('/dislikes', async (req, res) => {
    try {
        let club_id = req.body.club_id;
        let athl_id_arr = req.body.athl_id_arr;
        const result = await db.insertManyClubDislikes(club_id, athl_id_arr);
        res.json(result);
    }
    catch(err) {
        res.json(err);
    }
})


module.exports = router;