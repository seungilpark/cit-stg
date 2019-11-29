const express = require("express");
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/athletesDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");

/**
 * return all athletes
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
 * returns athlete by athlete' id
 */
router.get("/:id", async (req, res) => {
  try {
    let athl_id = req.params.id;
    const row = await db.getAthlById(athl_id);
    res.json(row);
  } catch (err) {
    res.json(
      `{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`
    );
  }
});

router.get("/location/:searchTerm", async (req, res) => {
  try {
    let searchTerm = req.params.searchTerm;
    const row = await db.getAthlByLocation(searchTerm);
    res.json(row);
  } catch (err) {
    res.json(
      `{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`
    );
  }
});

router.get("/name/:searchTerm", async (req, res) => {
  try {
    let searchTerm = req.params.searchTerm;
    const row = await db.getAthlByName(searchTerm);
    res.json(row);
  } catch (err) {
    res.json(
      `{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`
    );
  }
});

router.get("/sports/:sports", async (req, res) => {
  try {
    let sportsName = req.params.sports;
    const result = await db.getAthlBySportsName(sportsName);
    res.json(result);
  } catch (err) {
    res.json(
      `{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`
    );
  }
});

/* POST */
router.post("/register", async (req, res) => {
  try {
    /* TODO validate User */
    console.log(req.body);
    // let result = await db.createAthlete(req.body);

    let validationResult = joi.validate(req.body, SCHEMAS.ATHL_SIGNUP_SCHEMA)
      .error;
    if (validationResult) throw new Error(JSON.parse({"message":validationResult, "type":"invalid input from the client..."}));
    // check if the account name is in db
    
    //FIXME value checks for the inputs
    let athl_obj = {
      account: req.body["account"],
      password: req.body["password"],
      athl_dob: req.body["athl_dob"],
      athl_email: req.body["athl_email"],
      athl_phone: req.body["athl_phone"],
      athl_height: req.body["athl_height"],
      athl_weight: req.body["athl_weight"],
      athl_gender: req.body["athl_gender"],
      athl_fname: req.body["athl_fname"],
      athl_lname: req.body["athl_lname"],
      athl_addr: req.body["athl_addr"],
      city: req.body["city"],
      country: req.body["country"]
    };

    if (await db.isTaken(req.body.account)) throw new Error("user already exists...");
      
      let athlInsertResult = await dbHelper.insertInto("athletes", athl_obj);
      if(!athlInsertResult.insertId)  throw new Error("athl insert fail")
      //   console.log("if account is created this is the new athlete", newAthl);
      
      let athl_id = await athlInsertResult.insertId;
      //FIXME value checks for the inputs
      let profilesInput = {
        position: req.body["position"]
    };

    let prof_obj = Object.assign(
      {},
      profilesInput,
      { fk_athl_id: athl_id },
      { fk_sports_id: 1 }
      );

      let profInsertresult = await dbHelper.insertInto("profiles", prof_obj);
      console.log(profInsertresult);
      
      // new athl should be returned
      let newAthl = await db.getAthlById(athl_id);
      res.status(200).json(newAthl);
    } catch (err) {
        res.status(400).json(
      `{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`
    );
  }
});

router.post("/update/:id/", async (req, res) => {
  try {
    console.log(req.body.athl_dob);
    //console.log("IN DELETE FUNCTION");
    let athlete_id = req.params.id;
    let athlete_body = req.body;

    //console.log(club_id)

    let update_athlete = await db
        .updateAthleteById(athlete_body, athlete_id)
        .then(() => res.send(athlete_body));
  
    res.json(update_athlete);
  } catch (err) {
    console.log(err);
    res.json({ Error: "True" });
  }
});

/**
 * deletes athlete by id
 */
router.post("/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    //console.log("IN DELETE FUNCTION");
    let athl_id = req.params.id;
    console.log(athl_id);

    let deleted_athlete = await db
      .deleteAthleteById(athl_id)
      .then(() => "Row Deleted");

    res.json({ Message: "Deleted Row" });
  } catch {
    //console.log("inside delete")
    res.json({ Error: "True" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    let validateAccount = await db.validateAccount(req.body.account);
    if (validateAccount){
        let result = await db.verifyAthlete(req.body.account, req.body.password);
        if (result.length > 0){
          let athl_id = await db.getAthlIdByAccount(req.body.account);
          res.status(200).json(athl_id);
        } 
        else res.status(400).json({ message: "Wrong Password" });
    } else {
        res.status(400).json({ message: `No User Found` });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
