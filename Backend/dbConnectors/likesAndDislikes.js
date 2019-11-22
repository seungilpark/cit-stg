const pool = require("../config/database");
const mysql = require("mysql");


/* READ */
/* get all likes + dislikes by athl */
const getAllOfferByAthlId = (athl_id) => {
    return new Promise((resolve, reject) => {
        let query = "select fk_offer_id from athl_like where fk_athl_id=?"
        query = mysql.format(query, athl_id);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const getAllAthlByClubId = (club_id) => {
    return new Promise((resolve, reject) => {
        let query = "select fk_athl_id from club_like where fk_club_id=?"
        query = mysql.format(query, club_id);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const getAthlDislikes = (athl_id) => {
    return new Promise((resolve, reject) => {
        let query = `select fk_offer_id from athl_like where fk_athl_id=${athl_id} and isLiked=0`
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const getAthlLikes = (athl_id) => {
    return new Promise((resolve, reject) => {
        let query = `select fk_offer_id from athl_like where fk_athl_id=${athl_id} and isLiked = 1`
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

/* Create */
const insertAthlLikes = (athl_id, offer_id) => 
{
    return new Promise((resolve, reject) => {
        let query = "insert into athl_like (fk_athl_id, fk_offer_id, date, isLiked) values (?, ?, ?, ?)";
        query = mysql.format(query, [athl_id, offer_id, new Date(),1]);
        console.log(query);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const insertAthlDislikes = (athl_id, offer_id) => 
{
    return new Promise((resolve, reject) => {
        let query = "insert into athl_like (fk_athl_id, fk_offer_id, date, isLiked) values (?, ?, ?, ?)";
        query = mysql.format(query, [athl_id, offer_id, new Date(),0]);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}
/* NOTE test */
/* insert many rows to the athl_like by an array of offer_id which an athlete liked */
const insertManyAthlLikes = (athl_id, offer_id_arr) =>
{
    return new Promise((resolve, reject) => {
        let query = "insert into athl_like (fk_athl_id, fk_offer_id, date, isLiked) values ?";
        offer_id_arr = offer_id_arr.map(off_id => [athl_id, off_id, new Date(),1])
        
        query = mysql.format(query, [offer_id_arr]);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const insertManyAthlDislikes = (athl_id, offer_id_arr) =>
{
    return new Promise((resolve, reject) => {
        let query = "insert into athl_like (fk_athl_id, fk_offer_id, date, isLiked) values ?";
        offer_id_arr = offer_id_arr.map(off_id => [athl_id, off_id, new Date(),0])
        
        query = mysql.format(query, [offer_id_arr]);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

/* Club likes/dislikes */
const getClubDislikes = (fk_club_id) => {
    return new Promise((resolve, reject) => {
        let query = `select fk_athl_id from club_like where fk_club_id=${fk_club_id} and isLiked=0`
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const getClubLikes = (fk_club_id) => {
    return new Promise((resolve, reject) => {
        let query = `select fk_athl_id from club_like where fk_club_id=${fk_club_id} and isLiked = 1`
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

/* Create */
const insertClubLikes = (club_id, athl_id) => 
{
    return new Promise((resolve, reject) => {
        let query = "insert into club_like (fk_club_id, fk_athl_id, date, isLiked) values (?, ?, ?, ?)";
        query = mysql.format(query, [club_id, athl_id, new Date(),1]);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

const insertClubDislikes = (club_id, athl_id) => 
{
    return new Promise((resolve, reject) => {
        let query = "insert into club_like (fk_club_id, fk_athl_id, date, isLiked) values (?, ?, ?, ?)";
        query =  mysql.format(query, [club_id, athl_id, new Date(),0]);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}
const insertManyClubLikes = (club_id, athl_id_arr) =>
{
    return new Promise((resolve, reject) => {
        let query = "insert into club_like (fk_club_id, fk_athl_id, date, isLiked) values ?";
        athl_id_arr = athl_id_arr.map(id => [club_id, id, new Date(),1]);
        query = mysql.format(query, [athl_id_arr]);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}
const insertManyClubDislikes = (club_id, athl_id_arr) =>
{
    return new Promise((resolve, reject) => {
        let query = "insert into club_like (fk_club_id, fk_athl_id, date, isLiked) values ?";
        athl_id_arr = athl_id_arr.map(id => [club_id, id, new Date(),0]);
        query = mysql.format(query, [athl_id_arr]);
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}

// const getMatches = (club_id, athl_id) {
//     let query = ""
// }


module.exports = {
    getAllAthlByClubId,
    getAllOfferByAthlId,
    getAthlDislikes,
    getAthlLikes,
    insertAthlLikes,
    insertAthlDislikes,
    insertManyAthlLikes,
    insertManyAthlDislikes,
    getClubDislikes,
    getClubLikes,
    insertClubDislikes,
    insertClubLikes,
    insertManyClubDislikes,
    insertManyClubLikes
}