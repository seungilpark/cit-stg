const pool = require("../config/database");
const mysql = require("mysql");

/* READ */
const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("select athl_fname, athl_lname, athl_gender,athl_dob,athl_height,athl_weight,athl_email,athl_phone, athl_addr, city, country from athletes", (err, results, fields) => {
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
    let query ="select athl_fname, athl_lname, athl_gender,athl_dob,athl_height,athl_weight,athl_email,athl_phone, athl_addr, city, country from athletes where athl_addr LIKE " +
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
    "select athl_fname, athl_lname, athl_gender,athl_dob,athl_height,athl_weight,athl_email,athl_phone, athl_addr, city, country from athletes where athl_fname LIKE " +
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
  let query = `select athl_id, athl_fname, athl_lname, athl_gender,athl_dob,athl_height,athl_weight,athl_email,athl_phone, athl_addr, city, country from athletes where athl_id=` + pool.escape(inputId);

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      //TODO check if empty
      else resolve(results);
    });
  });
};


const getAthlByAccount = acc => {
  let query = `select * from athletes where account = ?`;
  query = mysql.format(query, acc);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}

const getAthlIdByAccount = acc => {
  let query = `select athl_id from athletes where account = ?`;
  query = mysql.format(query, acc);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}

// TODO sorting
// TODO searching

/* CREATE */
// createAthlete
const createAthlete = userObj => {
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
                athl_addr,
                city,
                country,
                account,
                password
            ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            //form query with the correct number of ?s based on the input ojbect (using string manipulation)
            // (we assume that the input object consists of all the necessary fields of the table and also the values)
            //format the query with the actual values
            //run the query
            // validate
            // return the result or output error
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

/* UPDATE problem with date will fix in future*/
const updateAthleteById = (inputBody, inputId) => {
  let query = `SET FOREIGN_KEY_CHECKS=0; update athletes set 
  athl_fname='${inputBody.athl_fname}',  
  athl_lname='${inputBody.athl_lname}', 
  athl_gender='${inputBody.athl_gender}',
  athl_dob='${new Date(inputBody.athl_dob).getFullYear()}-${new Date(inputBody.athl_dob).getMonth() < 10? "0"+new Date(inputBody.athl_dob).getMonth():new Date(inputBody.athl_dob).getMonth()}-${new Date(inputBody.athl_dob).getDate()}',
  athl_height=${inputBody.athl_height},
  athl_weight=${inputBody.athl_weight},
  athl_email='${inputBody.athl_email}',
  athl_phone='${inputBody.athl_phone}',
  athl_addr='${inputBody.athl_addr}',
  city='${inputBody.city}',
  country='${inputBody.country}',
  account='${inputBody.account}',
  password='${inputBody.password}'
  where athl_id=${inputId}; SET FOREIGN_KEY_CHECKS=1`;
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


/* For verifying athletes */
const verifyAthlete = (acc, pw) => {
  let query = `SELECT athl_id, athl_fname, athl_lname FROM athletes WHERE account=? AND password=?`;
  query = mysql.format(query,[acc,pw]);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {        
        if (err) reject(err);
        //TODO check if empty
        else {
         resolve(results);
        }
    });
});
}

const validateAccount = (acc) => {
  let query = `select * from athletes where account=?`;
  query = mysql.format(query, acc);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      if (results.length) resolve(false);
      else resolve(true);
    })
  })
}




module.exports = {
    getAll,
    getAthlById,
    getAthlIdByAccount,
    createAthlete,
    getAthlByLocation,
    getAthlByName,
    getAthlBySportsName,
    deleteAthleteById,
    updateAthleteById,
    verifyAthlete,
    validateAccount,
    getAthlByAccount
};