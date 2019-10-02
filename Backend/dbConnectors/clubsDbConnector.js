const pool = require("../config/database");



/* READ */
const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from athletes", (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        })
    })
}


const getAthlById = (inputId) => {
    let query= `select * from athletes where athl_id=${inputId}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    })
        
}

/* CREATE */
// createAthlete

/* UPDATE */
// updateAthlete 

/* REMOVE */
// removeAthlete

module.exports = {
    getAll,
    getAthlById,
}