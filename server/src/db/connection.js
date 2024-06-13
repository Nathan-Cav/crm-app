// db.js
// import postgres from 'postgres'
const postgres = require('postgres')

const sql = postgres('postgres://a:a@a:0/a', {
    host                 : process.env.DB_HOST,            // Postgres ip address[s] or domain name[s]
    port                 : process.env.DB_PORT,          // Postgres server port[s]
    database             : process.env.DB_DATABASE,            // Name of database to connect to
    username             : process.env.DB_USERNAME,            // Username of database user
    password             : process.env.DB_PASSWORD,            // Password of database user
  }) // will use psql environment variables

  
console.log(sql);
module.exports = sql;