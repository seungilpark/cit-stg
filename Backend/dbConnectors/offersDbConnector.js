const pool = require("../config/database");



/* READ */
const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from offers", (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        })
    })
}


const getOfferById = (inputId) => {
    let query= `select * from offers where offer_id=${inputId}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    })
        
}

/* CREATE */
// createOffer

/* UPDATE */
// updateOffer 

/* REMOVE */
// removeOffer

module.exports = {
    getAll,
    getOfferById,
}