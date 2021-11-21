const mysql = require("mysql");

function newConnect() {
  const connect = mysql.createConnection({
    host: "34.123.159.14",
    user: "root",
    password: "hzw073700",
    database: "userDB",
  });
  return connect;
}

module.exports = newConnect;
