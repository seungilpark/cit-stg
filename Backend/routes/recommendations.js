const express = require('express');
const router = express.Router();
const config = require("../config/config");
// const db = require("../dbConnectors/offersDbConnector");
const athlRepo = require("../dbConnectors/athletesDbConnector");
const recRepo = require("../dbConnectors/generateList");
const profRepo = require("../dbConnectors/profilesDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const likesRepo = require("../dbConnectors/likesAndDislikes");
const ERROR_MSG = "Error";

/**
 * return recommended offers by athl_id  
 */
router.get('/athlete/:athl_id', async (req, res) => {
    try {
        let athlId = req.params.athl_id;
        let athl =  athlRepo.getAthlById(athlId);
        let prof =  profRepo.getProfileByAthlId(athlId);
        let oid_arr =  likesRepo.getAllOfferByAthlId(athlId);
        let athlResult = await athl;
        let profResult  = await prof;
        let oid_arr_result = await oid_arr;
        oid_arr_result = oid_arr_result.map(el => el.fk_offer_id);
        let recList = await recRepo.getClubRecommendation(profResult[0].fk_sports_id, profResult[0].position, athlResult[0].country);
        recList = recList.filter(el => (![oid_arr_result].includes(el.offer_id)));
        res.json(recList);
    }
    catch(err) {
        res.json(err);
    }
});

router.get('/club/:club_id', async (req, res) => {
    try {
        let club_id = req.params.club_id;
        let athl_id_arr = await likesRepo.getAllAthlByClubId(club_id)
        let recList = await recRepo.getAthlRecommendation(club_id);
        console.log(recList)
        // recList = recList.filter(el => !([athl_id_arr].includes(el.athl_id)));
        res.json(recList);
    }
    catch(err) {
        res.json(err);
    }
});

module.exports = router;