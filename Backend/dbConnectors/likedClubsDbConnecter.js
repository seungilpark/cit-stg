const pool = require("../config/database");

const getLikesByAthleteId = inputId => {
  // let query = 'select a.athl_id, c.club_id, c.club_name, c.city, o.offer_amount, o.offer_desc, o.offer_photo, o.offer_position, o.offer_title' +
  //             ' from athletes as a inner join athl_like as al on a.athl_id = al.fk_athl_id inner join offers as o on al.fk_offer_id = o.offer_id' +
  //             ' inner join clubs as c on o.fk_club_id = c.club_id where al.isLiked = 1 and al.fk_athl_id = 3 and c.club_id in (select c.club_id' +
  //             ' from athletes as a inner join club_like as cl on cl.fk_athl_id=a.athl_id inner join clubs as c on cl.fk_club_id=c.club_id' +
  //             ' where cl.isLiked=1 and cl.fk_athl_id = 3);'

  let query = 'select a.athl_id, c.club_id, c.club_name, c.city, o.offer_amount, o.offer_desc, o.offer_photo, o.offer_position, o.offer_title from athletes as a inner join athl_like as al on a.athl_id = al.fk_athl_id inner join offers as o on al.fk_offer_id = o.offer_id inner join clubs as c on o.fk_club_id = c.club_id where al.isLiked = 1 and al.fk_athl_id = 3 and c.club_id in (select c.club_id from athletes as a inner join club_like as cl on cl.fk_athl_id=a.athl_id inner join clubs as c on cl.fk_club_id=c.club_id where cl.isLiked=1 and cl.fk_athl_id = 3);'
  console.log(query);

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