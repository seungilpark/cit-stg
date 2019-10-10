const pool = require("../config/database");



/* READ */
const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from sports", (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        })
    })
}


const getSportsById = (inputId) => {
    let query= `select * from sports where sports_id=${inputId}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    })
        
}

/* CREATE */
// createSports

/* UPDATE */
// updateSports 

/* REMOVE */
// removeSports

module.exports = {
    getAll,
    getSportsById,
}