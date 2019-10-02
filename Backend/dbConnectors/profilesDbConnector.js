const pool = require("../config/database");



/* READ */
const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from profiles", (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        })
    })
}


const getProfileById = (inputId) => {
    let query= `select * from profiles where profile_id=${inputId}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    })
        
}

/* CREATE */
// createProfile

/* UPDATE */
// updateProfile 

/* REMOVE */
// removeProfile

module.exports = {
    getAll,
    getProfileById,
}