// const util = require("util");
// const mysql = require("mysql");
/* TODO make a pool wrapper to be used in async functions  */

const db = require("../config/database");
const mysql = require("mysql");

//Version 2.0/  + schema validation
// const insertInto(tablename, obj, SCHEMA)
// {
//     /* validation funciton object based on SCHEMA */

// }

const insertInto = (tablename, obj) => {
  // tablename must be escaped from the router to prevent injection?
  let keys = Object.keys(obj);
  let values = Object.values(obj);
  let qqstr = "??" + ", ??".repeat(keys.length - 1);
  let qstr = "?" + ", ?".repeat(keys.length - 1);
  let query = `INSERT INTO ${tablename} (${qqstr}) VALUES (${qstr})`;
  query = mysql.format(query, keys.concat(values));
  console.log(query);
  return new Promise((resolve, reject) => {
    db.query(query, (err, results, fields) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


const now = () => {
  var objToday = new Date(),
    weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function() {
      var a = objToday;
      if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
      a = parseInt((a + "").charAt(1));
      return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? "0" + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? "0" + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? "0" + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  
    var today =
    curHour +
    ":" +
    curMinute +
    "." +
    curSeconds +
    curMeridiem +
    " " +
    dayOfWeek +
    " " +
    dayOfMonth +
    " of " +
    curMonth +
    ", " +
    curYear;

    return today;
};
/*
 * update query
 *
 */
module.exports = {
  insertInto,
  now
};
