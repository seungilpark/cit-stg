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
        let athl = await athlRepo.getAthlById(athlId);
        let { country } = athl;
        let prof = await profRepo.getProfileByAthlId(athlId);
        let {fk_sports_id, position} = prof;
        let dislikes = await likesRepo.getDisOffers(athlId);
        dislikes = dislikes.map(el => el.fk_club_id);
        let recList = await recRepo.generateClubsList(fk_sports_id, position, country, dislikes);
        
        res.json(recList);
    }
    catch(err) {
        res.json(err);
    }
});


module.exports = router;