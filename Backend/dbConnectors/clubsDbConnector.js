const pool = require("../config/database");

/* READ */
const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from clubs", (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    });
};


const getClubById = (inputId) => {
    let query= `select * from clubs where club_id=${inputId}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    });
        
};

const getClubsByName = (name) => {
    let query = `select * from clubs where club_name= '${name}' `;

    return new Promise((resolve, reject) => {  
        pool.query(query, (err, results, fields) => {
          if (err) reject(err);
          //TODO check if empty
          else resolve(results);
        });
    });
}

const getClubsByLocation = (searchTerm) => {
    return new Promise((resolve, reject) => { 
        let query ="select club_name, club_size, club_status, club_url, club_contact, street_name, city, country from clubs where country LIKE" +
          pool.escape("%" + searchTerm + "%") +
          "or city LIKE " +
          pool.escape("%" + searchTerm + "%");
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    });
};

// const getClubById = inputId => {
//   let query = `select * from clubs where club_id =` + pool.escape(inputId);
//   console.log(query);
//   return new Promise((resolve, reject) => {
//     pool.query(query, (err, results, fields) => {
//       if (err) reject(err);
//       //TODO check if empty
//       else resolve(results);
//     });
//   });
// };



/* CREATE */
// createClub


/* UPDATE */
const updateClubById = (inputBody, inputId) => {
    let query = `update clubs set club_name='${inputBody.club_name}', club_size='${inputBody.club_size}', club_status='${inputBody.club_status}', 
    club_url='${inputBody.club_url}', club_contact='${inputBody.club_contact}', street_name='${inputBody.street_name}', 
    city='${inputBody.city}', country='${inputBody.country}' where club_id=${inputId}`;
    console.log(query);
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    });
        
};

/* REMOVE */
// removeClub
const deleteClubById = (inputId) => {
    let query = `SET FOREIGN_KEY_CHECKS=0; delete from clubs where club_id=${inputId};SET FOREIGN_KEY_CHECKS=1`;
    //console.log(query);
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
    getClubById,
    getClubsByName,
    getClubsByLocation,
    deleteClubById,
    updateClubById,
};

