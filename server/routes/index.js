const express = require('express');
const router = express.Router();
const db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  const sql = "SELECT * FROM vines WHERE id IN (SELECT id FROM vines ORDER BY RANDOM() LIMIT 50)";

  db.all(sql, (err, rows) => {
	if(err) {
		return err;
	}

    res.json(rows);
  });
});

module.exports = router;
