const express = require('express');
const router = express.Router();
const db = require('../database');
const shuffle = require('../utils/shuffle');

/* GET home page. */
router.get('/', function(req, res, next) {
  const sql = "SELECT * FROM vines";

  db.all(sql, (err, rows) => {
	if(err) {
		return err;
	}

	shuffle(rows);

    res.json(rows);
  });
});

module.exports = router;
