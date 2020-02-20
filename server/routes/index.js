const express = require('express')
const router = express.Router()
const shuffle = require('../utils/shuffle')
const { Vine } = require('../db')

/* GET home page. */
router.get('/api', async function(req, res, next) {
	try {
		const results = await Vine.find({}).populate('user')
		const shuffled = shuffle([...results])
		res.json(shuffled)
	} catch (err) {
		console.log(err)
		res.status(500).send('nah lol')
	}
})

module.exports = router
