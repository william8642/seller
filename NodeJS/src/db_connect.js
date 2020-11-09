const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "william",
  password: "willie8642",
  database: "topicorder",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();