const pool = require("../config/database");
const mysql = require("mysql");

/* READ */
const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("select * from club_mgr", (err, results, fields) => {
      if (err) reject(err);
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
      else resolve(results);
    });
  });
};

const updateClubMgrById = (inputBody, inputId) => {
  let query = `SET FOREIGN_KEY_CHECKS=0; update club_mgr set mgr_fname='${inputBody.mgr_fname}', mgr_lname='${inputBody.mgr_lname}', mgr_account='${inputBody.mgr_account}', mgr_password='${inputBody.mgr_password}', mgr_email='${inputBody.mgr_email}', mgr_phone='${inputBody.mgr_phone}' where mgr_id=${inputId}; SET FOREIGN_KEY_CHECKS=1`;
  console.log(query);
  return new Promise((resolve, reject) => {
      pool.query(query, (err, results, fields) => {        
          if (err) reject(err);
          //TODO check if empty
          else resolve(results);
      });
  });
      
};

const getManagerByUsername = inputMgrAccount => {
  let query = `select * from club_mgr where mgr_account =` + pool.escape(inputMgrAccount);
  console.log(query)
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {        
        if (err) reject(err);
        //TODO check if empty
        else resolve(results);
    });
});
}
/* signin/up */

const validateAccount = (acc) => {
  let query = `select * from club_mgr where mgr_account=?`;
  query = mysql.format(query, acc);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      if (results.length) resolve(false);
      else resolve(true);
    })
  })
}

const verifyManager = (acc, pw) => {
  let query = `SELECT mgr_id, mgr_fname, mgr_lname, fk_clubs_id FROM club_mgr WHERE mgr_account=${pool.escape(acc)} AND mgr_password=${pool.escape(pw)}`;
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {        
        if (err) reject(err);
        else {
         resolve(results);
        }
    });
});
}
module.exports = {
  getAll,
  getManagerById,
  verifyManager,
  validateAccount,
  updateClubMgrById,
  getManagerByUsername
};
