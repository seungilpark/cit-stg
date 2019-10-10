const pool = require("../config/database");

/* READ */
const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("select * from club_mgr", (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
  });
};

const getManagerById = inputId => {
  let query = `select * from club_mgr where mgr_id =` + pool.escape(inputId);
  console.log(query);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
  });
};

/* CREATE */
// createManager


/* UPDATE */
// updateManager

/* REMOVE */
// removeManager

module.exports = {
  getAll,
  getManagerById
};
