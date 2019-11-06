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
 * return 10 recommendations of offers  
 */
router.get('/offers/:athl_id', async (req, res) => {
    try {
        let athlId = req.params.athl_id;
        let athl =  athlRepo.getAthlById(athlId);
        let prof =  profRepo.getProfileByAthlId(athlId);
        let dislikes =  likesRepo.getDisOffers(athlId);
        let athlResult = await athl;
        let profResult  = await prof;
        let dislikesResult = await dislikes;
        dislikes = dislikesResult.map(el => el.fk_club_id);

        let recList = await recRepo.generateClubsList(profResult[0].fk_sports_id, profResult[0].position, athlResult[0].country, dislikes);
        res.json(recList);
    }
    catch(err) {
        res.json(err);
    }
});


module.exports = router;