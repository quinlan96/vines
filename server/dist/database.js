"use strict";

var sqlite3 = require('sqlite3').verbose();

var DBSOURCE = process.env.DB_FILE;
var db = new sqlite3.Database(DBSOURCE, function (err) {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});
module.exports = db;