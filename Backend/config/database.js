const mysql = require("mysql");
//TODOS: replace credentials using config 
const pool  = mysql.createPool({
    connectionLimit:100,
    host:"localhost",
    user:"root",
    password:"Password",
    database:"stg"
});


pool.getConnection((err, connection) => {
    if (err){
        if (err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("database connection was closed.");
        }
        
        if (err.code === "ER_CON_COUNT_ERROR"){
            console.error("Database has too many connections.");
        }
        
        if (err.code === "ECONNREFUSED"){
            console.error("Database connection was refused.");
        }

        if (connection) {
            console.log("connection successful");
            connection.release();
            
            return

        }
    }
})

module.exports = pool;
