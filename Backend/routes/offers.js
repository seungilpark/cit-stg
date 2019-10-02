const express = require('express');
const router = express.Router();
const config = require("../config/config");
const db = require("../dbConnectors/offersDbConnector");



/**
 * return all athletes  
 */
router.get('/', async (req, res) => {
    try {
        let results = await db.getAll();
        res.send(results);
    }
    catch(err) {
        console.log(err);
        res.code(400).send(err);
    }
});

router.get("/:offerId", async (req, res) => {
    try {
        const offerId = req.params.offerId;
        let row = await db.getOfferById(offerId);
        res.json(row);
    }
    catch {
        res.json({"Error":"True"});
    }
})

module.exports = router;