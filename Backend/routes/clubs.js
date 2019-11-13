const express = require("express");
const router = express.Router();
const db = require("../dbConnectors/clubsDbConnector");
const mgrDb = require("../dbConnectors/clubMgrDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");

/**
 * return all clubs
 */
router.get("/", async (req, res) => {
  try {
    let results = await db.getAll();
    res.json(results);
  } catch (err) {
    res.json(
      `{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`
    );
  }
});

/**
 * Returns a club by id
 */

// router.get('/:id', async (req, res) => {
//     try {

//         let club_id = req.params.id;
//         let row = await db.getClubById(club_id);
//         res.json(row);
//         //console.log("TESTING GET CALL")
//     }
//     catch {
//         //console.log("inside get")
//         res.json({"Error":"True"});
//     }
// });

router.post("/update/:id/", async (req, res) => {
  try {
    console.log(req.body.club_name);
    let club_id = req.params.id;
    let club_body = req.body;

    //console.log(club_id)

    let update_club = await db
      .updateClubById(club_body, club_id)
      .then(() => "Row updated");

    res.json({ Message: "Updated Row" });
  } catch {
    console.log("inside delete");
    res.json({ Error: "True" });
  }
});

/**
 * Returns a list of clubs in a specified location either by city or country
 */
router.get("/location/:location", async (req, res) => {
  try {
    let loc = req.params.location;
    let fetched_rows = await db.getClubsByLocation(loc);

    res.json(fetched_rows);
    //console.log("Inside get club by location");
  } catch {
    //console.log("Inside get club by location error");
    res.json({ Error: "True" });
  }
});

/**
 * Returns club with the name specified
 */
router.get("/name/:name", async (req, res) => {
  try {
    let club_name = req.params.name;

    let club = await db.getClubsByName(club_name);

    res.json(club);
  } catch {
    res.json({ Error: "True" });
  }
});

/**
 * Deletes club by id
 */
router.post("/delete/:id", async (req, res) => {

    try {
       //console.log(req.params.id);
        let club_id = req.params.id;
        //console.log(club_id)

        let deleted_club = await db.deleteClubById(club_id)
        .then(() => 'Row Deleted');
        
        res.json({"Message":"Deleted Row"});
   }
    catch {
        //console.log("inside delete")
        res.json({"Error":"True"});
    }
});
/* POST */

router.post("/create", async (req, res) => {
    try {
        let validation =joi.validate(req.body,SCHEMAS.CLUBS_SCHEMA).error;
        if (validation) throw new Error(validation);
        let result = await dbHelper.insertInto("clubs", req.body);
        res.json(result);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})
/* POST */
// FIXME using transaction is better
// TODO club_obj["fk_sports_id"] is hard coded
router.post("/signup", async (req, res) => {
  try {
    let validation = joi.validate(req.body, SCHEMAS.CLUBS_MNGRS_SCHEMA).error;
    if (validation) throw new Error(validation);
    //separate clubs obj
    let club_obj = {
      "club_name": req.body["club_name"],
      "club_size": req.body["club_size"],
      "club_status": req.body["club_status"],
      "club_url": req.body["club_url"],
      "club_contact": req.body["club_contact"],
      "fk_sports_id": 1,
      "street_name": req.body["street_name"],
      "city": req.body["city"],
      "country": req.body["country"]
    };
    //validate account name
    if (await mgrDb.validateAccount(req.body.mgr_account)) {
      let clubInsertResult = await dbHelper.insertInto("clubs", club_obj);
      console.log("clubInserted", clubInsertResult);
      if (clubInsertResult.length < 1) throw new Error("club insert fail");
      
        let newClubId = clubInsertResult.insertId;
        console.log(newClubId)
        let mgrObj = {
          "mgr_fname":req.body["mgr_fname"],
            "mgr_lname":req.body["mgr_lname"],
            "mgr_email":req.body["mgr_email"],
            "mgr_phone":req.body["mgr_phone"],
            "fk_clubs_id":newClubId,
            "mgr_account":req.body["mgr_account"],
            "mgr_password":req.body["mgr_password"],
          } 
        //insert club Mgr
        let mgrInsertResult = await dbHelper.insertInto("club_mgr", mgrObj);
        //check if insert succeeded 
        if (mgrInsertResult.length < 1) throw new Error("mgr insert fail");
        
        //return club + clubmgr info
        res.status(200).json(await db.getClubAndMgrByClubId(newClubId));


    } else {
      console.log("account exists...")
      throw new Error("user already exists...");
    } 

  } catch (err) {
    res.json(
      `{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`
    );
  }
});

router.post("/signin", async (req, res) => {
  try {
    let result = await db.verifyManager(req.body.account, req.body.password);
    if (result.length > 0) res.status(203).json(result);
    else res.status(403).json({ message: "cannot verify the user" });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
