const express = require('express');
const router = express.Router();
const config = require("../config/config");
// const db = require("../dbConnectors/offersDbConnector");
const athlRepo = require("../dbConnectors/athletesDbConnector");
const recRepo = require("../dbConnectors/generateList");
const profRepo = require("../dbConnectors/profilesDbConnector");
const likesRepo = require("../dbConnectors/likesAndDislikes");
const offerRepo = require("../dbConnectors/offersDbConnector");
const POSITION_LIST = ["GK","RF","LF","CB","DM","RW","RM","CM","BM","SK","AM","AP","LM","LW"]
const COUNTRY_LIST = ["Canada", "France", "England","Spain"];
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
        // console.log("athlResult", athlResult)
        if (!athlResult.length) throw new Error(`no user id ${athlId}`)
        let profResult  = await prof;
        // console.log("profResult", profResult)
        if (!profResult.length) throw new Error(`no profile with fk_athl_id ${athlId}`)
        let oid_arr_result = await oid_arr;
        oid_arr_result = oid_arr_result.map(el => el.fk_offer_id);
        // console.log("position, country", profResult[0].position.trim(), athlResult[0].country.trim())

        if (!(POSITION_LIST.includes(profResult[0].position.trim())) 
        || !(COUNTRY_LIST.includes(athlResult[0].country.trim()))) {
            console.log("in side recommendation/athl/ without position or country")
            let recList = await offerRepo.getAllOffersWithClub();
            console.log(recList.length)
            res.json(recList);
        } else {
            let recList = await recRepo.getClubRecommendation(profResult[0].fk_sports_id, profResult[0].position, athlResult[0].country);
            console.log(recList.length)
            recList = recList.filter(el => {
                // console.log(el.offer_id==el.offer_id)
                return !(oid_arr_result.includes(el.offer_id))
            });
            // console.log("in side recommendation/athl/",recList)
            console.log(recList.length)
            
            if (!recList.length) {
                recList = await offerRepo.getAllOffersWithClub();
                console.log(recList.length);
            }
            
            res.json(recList)
        }
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
        athl_id_arr = athl_id_arr.map(el=>el.fk_athl_id);
        console.log(athl_id_arr);
        console.log(recList.length)
        recList = recList.filter(el => !(athl_id_arr.includes(el.athl_id)));
        console.log(recList.length)
        res.json(recList);
    }
    catch(err) {
        res.json(err);
    }
});

module.exports = router;