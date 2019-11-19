const express = require('express');
const router = express.Router();
const db = require("../dbConnectors/clubMgrDbConnector");
const dbHelper = require("../dbConnectors/DbHelper");
const joi = require("joi");
const SCHEMAS = require("../models/SCHEMAS");

/**
 * return all clubs  
 */
router.get('/', async (req, res) => {
    try {
        let results = await db.getAll();
        res.json(results);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
});


router.get('/:mgrId', async (req, res) => {
    try {
        let mgrId = req.params.mgrId;
        let row = await db.getManagerById(mgrId);
        res.json(row);
    }
    catch(err) {
        res.json(`{"Error": "True", "Message": ${err}, "Timestamp": ${dbHelper.now()}`);
    }
})

router.post("/update/:id/", async (req, res) => {
    try {
      //console.log("IN DELETE FUNCTION");
      let mgr_id = req.params.id;
      let mgr_body = req.body;
      let mgr_fname = req.body.mgr_fname;
      let mgr_lname = req.body.mgr_lname;
      let mgr_account = req.body.mgr_account;
      let mgr_password = req.body.mgr_password;

        console.log(mgr_body)
      console.log(mgr_id)
      console.log(mgr_fname)
      console.log(mgr_lname)
      console.log(mgr_account)
      console.log(mgr_password)
      console.log('Status: ' + res.statusCode );
  
      let update_mgr = await db
        .updateClubMgrById(mgr_body, mgr_id)
        .then(() => "Row updated");
  
      res.json({ Message: "Updated Row" });
      if(res.statusCode == 200){
        res.send("Club Manager Updated.")
      }
    } catch (err) {
      console.log(err);
      res.json({ Error: "True" });
    }
  });





module.exports = router;