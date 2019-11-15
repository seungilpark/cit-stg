const pool = require("../config/database");
const mysql = require("mysql")


/* READ */
const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from offers", (err, results, fields) => {
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        })
    })
}

const getAllOffersWithClub = () => {
    let query = "select c.club_id, c.club_name,  c.club_url, c.club_contact, c.country, o.offer_id, o.offer_position, o.offer_amount, o.offer_desc, o.offer_photo, o.offer_types, o.offer_length, o.offer_title, s.sports_name from clubs as c inner join sports as s on c.fk_sports_id = s.sports_id inner join offers as o on c.club_id = o.fk_club_id limit 50"
    return new Promise((resolve, reject)=> {
        pool.query(query, (err, results, fields)=>{
            console.log(results);
            if(err) reject(err);
            else resolve(results);
        })
    })
}



const getOfferById = (inputId) => {
    let query= `select * from offers where offer_id=${inputId}`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {        
            if (err) reject(err);
            //TODO check if empty
            else resolve(results);
        });
    })
        
}

/* CREATE */
// createOffer

/* UPDATE */
// updateOffer 

/* REMOVE */
// removeOffer

module.exports = {
    getAll,
    getOfferById,
    getAllOffersWithClub
}