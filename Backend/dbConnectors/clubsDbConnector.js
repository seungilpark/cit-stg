const pool = require("../config/database");



/* READ */
const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from clubs", (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        })
    })
}


const getClubById = (inputId) => {
    let query= `select * from clubs where club_id=${inputId}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    })
        
}

/* CREATE */
// createClub

/* UPDATE */
// updateClub 

/* REMOVE */
// removeClub

module.exports = {
    getAll,
    getClubById,
}