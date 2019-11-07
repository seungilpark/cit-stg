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
        let athl_id = req.params.id;
        console.log(athl_id)
        const rows = await db.getAthlLikes(athl_id);
        res.json(rows)
    }
    catch(err) {
        res.json((`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`));
    }
})

router.get('/dislikes/:id', async (req, res) => {
    try {
        let athl_id = req.params.id;
        console.log(athl_id)
        const rows = await db.getAthlDislikes(athl_id);
        res.json(rows)
    }
    catch(err) {
        res.json((`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`));
    }
})
/* /api/athlLikes/like */
router.post('/like', async (req, res) => {
    try {
        let athl_id = req.body.athl_id;
        let offer_id = req.body.offer_id;
        const result = await db.insertAthlLikes(athl_id, offer_id);
        res.json(result);
    }
    catch(err) {
        res.json(err);
    }
})

router.post('/likes', async (req, res) => {
    try {
        let athl_id = req.body.athl_id;
        let offer_id_arr = req.body.offer_id_arr;
        const result = await db.insertManyAthlLikes(athl_id, offer_id_arr);
        res.json(result);
    }
    catch(err) {
        res.json(err);
    }
})

router.post('/dislike', async (req, res) => {
    try {
        let athl_id = req.body.athl_id;
        let offer_id = req.body.offer_id;
        const result = await db.insertAthlDislikes(athl_id, offer_id);
        res.json(result);
    }
    catch(err) {
        res.json(err);
    }
})

router.post('/dislikes', async (req, res) => {
    try {
        let athl_id = req.body.athl_id;
        let offer_id_arr = req.body.offer_id_arr;
        const result = await db.insertManyAthlDislikes(athl_id, offer_id_arr);
        res.json(result);
    }
    catch(err) {
        res.json(err);
    }
})


module.exports = router;