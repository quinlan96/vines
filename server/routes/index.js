const express = require('express');
const router = express.Router();
const shuffle = require('../utils/shuffle');
const db = require('../database');

/* GET home page. */
router.get('/api', function(req, res, next) {
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
