const pool = require("../config/database");
const mysql = require("mysql");

/* READ */
const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("select athl_fname, athl_lname, athl_gender,athl_dob,athl_height,athl_weight,athl_email,athl_phone from athletes", (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
  });
};
/* TODO search by location v.1 should allow searching by city, country
    this requires altering table in database
*/
const getAthlByLocation = searchTerm => {
  return new Promise((resolve, reject) => {
    let query ="select athl_fname, athl_lname, athl_gender,athl_dob,athl_height,athl_weight,athl_email,athl_phone from athletes where athl_addr LIKE " +
      pool.escape("%" + searchTerm + "%");
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
  });
};

const getAthlByName = searchTerm => {
  return new Promise((resolve, reject) => {
    let query =
    "select athl_fname, athl_lname, athl_gender,athl_dob,athl_height,athl_weight,athl_email,athl_phone from athletes where athl_fname LIKE " +
      pool.escape("%" + searchTerm + "%") +
      "or athl_fname LIKE " +
      pool.escape("%" + searchTerm + "%");
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
  });
};

const getAthlBySportsName = sportsName => {
  return new Promise((resolve, reject) => {
    let query =
      `select a.athl_fname, a.athl_lname, s.sports_name, p.profile_photo, p.profile_video from sports as s 
        inner join profiles as p 
        on s.sports_id = p.fk_sports_id 
        inner join athletes as a
        on p.fk_athl_id = a.athl_id
        where s.sports_name like ` + pool.escape('%'+sportsName+'%');
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);

    });
  });
};

const getAthlById = inputId => {
  let query = `select athl_fname, athl_lname, athl_gender,athl_dob,athl_height,athl_weight,athl_email,athl_phone from athletes where athl_id=` + pool.escape(inputId);

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
  });
};
// TODO sorting
// TODO searching

/* CREATE */
// createAthlete
const createAthlete = userObj => {
  /* TODO validation */
  /* TODO password encryption */

  let query = `insert into athletes
            (
                athl_fname,  
                athl_lname, 
                athl_gender,
                athl_dob,
                athl_height,
                athl_weight,
                athl_email,
                athl_phone,
                account,
                password
            ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let values = Object.values(userObj);
  console.log(userObj);
  query = mysql.format(query, values);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
  });
};

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
    createAthlete,
    getAthlByLocation,
    getAthlByName,
    getAthlBySportsName,
    deleteAthleteById,
};

