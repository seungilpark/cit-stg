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
    // TODO sorting 
    // TODO searching

/* CREATE */
// createAthlete

const createAthlete = (userInput) => {

}

/* UPDATE */
// updateAthlete 




/* REMOVE */
// removeAthlete
const deleteAthleteById = (inputId) => {
    let query = `SET FOREIGN_KEY_CHECKS=0; delete from athletes where athl_id=${inputId};SET FOREIGN_KEY_CHECKS=1`;
    console.log(query);
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    });
        
};
module.exports = {
    getAll,
    getAthlById,
    deleteAthleteById,
}