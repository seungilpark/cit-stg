const pool = require("../config/database");
const mysql = require("mysql");


/* READ */
const getDisOffers = (athl_id) => {
    return new Promise((resolve, reject) => {
        let query = `select fk_offer_id from athl_like where fk_athl_id=${athl_id} and isLiked=0`
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const getLikesOffers = (athl_id) => {
    return new Promise((resolve, reject) => {
        let query = `select fk_offer_id from athl_like where fk_athl_id=${athl_id} and isLiked = 1`
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}


module.exports = {
    getDisOffers,
    getLikesOffers,
}