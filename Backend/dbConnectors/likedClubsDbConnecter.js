const pool = require("../config/database");

const getLikesByAthleteId = inputId => {
let query = `SELECT * from athl_like where fk_athl_id = ${inputId} and isLiked = 1`

return new Promise((resolve, reject) => {  
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
});
}

module.exports = {
    getLikesByAthleteId,
}