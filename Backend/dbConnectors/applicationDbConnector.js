const pool = require("../config/database");

/* READ */
const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from applications", (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        })
    })
}


const getApplByAthlId = (inputId) => {
    let query=
        `select * 
        from applications as a 
        inner join profiles as p
        on a.fk_profile_id=p.profile_id
        inner join athletes as athl
        on p.fk_athl_id = athl.athl_id
        where athl.athl_id=${inputId}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    })
        
}

    
const getApplByClubId = (inputId) => {
    let query=
        `select * 
        from applications as a 
        inner join offers as o
        on a.fk_offer_id = o.offer_id
        inner join clubs as c
        on o.fk_club_id = c.club_id 
        where c.club_id=${inputId}`;

        
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results)
        });
    })
}


/* CREATE */
// createApplication

/* UPDATE */
// updateApplication 

/* REMOVE */
// removeApplication

module.exports = {
    getAll,
    getApplByAthlId,
    getApplByClubId

}