// repository for generating recommendation lists for athletes and clubs
//  the methods here will be used to create a list of items based on the parameters
//  for athletes it will be a list of clubs/offers matching their information such as location, sports, position, money etc.
const pool = require("../config/database");
const mysql = require("mysql");

/*
 * generate a list of offers based on an athlete's sports, position, country, and disliked offers
 * TODO: this should also look at user's liked offers and generate accordingly
 *          maybe ML models
 * country:str
 * sports:str
 * position:str
 * oid_arr: offer_id[]
 */
const getClubRecommendation = (sports_id, position, country) => {
    country = country.trim();
    position = position.trim();
    console.log(country, position, sports_id)
    let query = "select c.club_id, c.club_name,  c.club_url, c.club_contact, c.country, o.offer_id, o.offer_position, o.offer_amount, o.offer_desc, o.offer_photo, o.offer_types, o.offer_length, o.offer_title, s.sports_name from clubs as c inner join sports as s on c.fk_sports_id = s.sports_id inner join offers as o on c.club_id = o.fk_club_id where c.country=? and o.offer_position =? and s.sports_id =?"
    query = mysql.format(query, [country, position, sports_id]);
      console.log(query);
    return new Promise((resolve, reject) => {
      pool.query(query, (err, results, fields) => {
        console.log(results);
        if (err) reject(err);
        else resolve(results);
      });
    });
};
/* 
* TODO Get recommended athletes
* sports id: int
* positionlist: position str[]
* country: str 
*/
const getAthlRecommendation = (club_id) => {
    /* ? seems like changes to str while ?? subsittute values  */
    let query = "select * from athletes as a inner join profiles as p on a.athl_id=p.fk_athl_id where a.country=(select country from clubs where club_id=?)"
    query = mysql.format(query, club_id);
    return new Promise((resolve, reject) => {
      pool.query(query, (err, results, fields) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
};

const getMatchedByAthlId = athl_id => {
  let query = `select a.athl_id, c.club_id, c.club_name, c.country, o.offer_amount, o.offer_desc, o.offer_photo, o.offer_position, o.offer_title
    from athletes as a
    inner join athl_like as al
    on a.athl_id = al.fk_athl_id
    inner join offers as o
    on al.fk_offer_id = o.offer_id
    inner join clubs as c
    on o.fk_club_id = c.club_id
    where al.isLiked = 1 
    and al.fk_athl_id = ?
    and c.club_id in (select c.club_id
    from athletes as a
    inner join club_like as cl
    on cl.fk_athl_id=a.athl_id
    inner join clubs as c
    on cl.fk_club_id=c.club_id
    where cl.isLiked=1 and cl.fk_athl_id = ?);`;
  query = mysql.format(query, [athl_id, athl_id]);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
/* TODO: get matched athletes by clubs id */
const getMatchedByClubId = club_id => {
  let query = `select distinct a.*, p.*
  from athletes as a 
  inner join profiles as p
  on p.fk_athl_id=a.athl_id
  inner join club_like as cl
  on a.athl_id=cl.fk_athl_id
  inner join clubs as c
  on c.club_id=fk_club_id
  where c.club_id=?
  and a.athl_id in (select athl_id 
  from athletes as a 
  inner join athl_like as al
  on a.athl_id = al.fk_athl_id
  inner join offers as o
  on al.fk_offer_id=o.offer_id
  inner join clubs as c
  on o.fk_club_id=c.club_id
  where c.club_id=?);`;
  query = mysql.format(query, [club_id, club_id]);
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  getClubRecommendation,
  getAthlRecommendation,
  getMatchedByAthlId,
  getMatchedByClubId
};
