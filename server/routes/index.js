const express = require('express')
const router = express.Router()
const shuffle = require('../utils/shuffle')
const Vine = require('../db/Vine')

/* GET home page. */
router.get('/api', async function(req, res, next) {
	Vine.find({})
		.then(docs => {
			const shuffled = shuffle([...docs])
			res.json(shuffled)
		})
		.catch(err => next(err))
})

module.exports = router
