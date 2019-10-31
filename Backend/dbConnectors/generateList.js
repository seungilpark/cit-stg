// repository for generating recommendation lists for athletes and clubs
//  the methods here will be used to create a list of items based on the parameters 
//  for athletes it will be a list of clubs/offers matching their information such as location, sports, position, money etc.
const pool = require("../config/database");
const mysql = require("mysql");
/* 
 * Params
 * {
 * country:str
 * sports:str
 * position:str
 * dislikes: offer_id[]
 * }
 */
const generateClubsList = (sports_id, position, country, dislikes) =>
{
    /* get a list of offers/clubs inforamtion based on the params
        - join offers and clubs
        - filter 
        - order by salary
    */
   let query = `select c.club_id, 
                        c.club_name, 
                        c.club_url, 
                        c.club_contact, 
                        c.country,
                        o.offer_id,
                        o.offer_position,
                        o.offer_amount,
                        o.offer_desc,
                        o.offer_photo,
                        o.offer_types,
                        o.offer_length,
                        o.offer_title,
                        s.sports_name
                    from clubs as c 
                    inner join sports as s
                    on c.fk_sports_id = s.sports_id
                    inner join offers as o
                    on c.club_id = o.fk_club_id
                    where c.country = ? and
                    o.offer_position = ? and
                    s.sports_id = ? and
                    c.offer_id not in ?
                    order by o.offer_amount
                    `;

    mysql.format(query,country,position, sports_id, dislikes);
    
    return new Promise((resolve, reject) => {  
        pool.query(query, (err, results, fields) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}



module.exports = {
    generateClubsList,
}