import express from 'express'
import createError from 'http-errors'
import fetch from 'node-fetch'
import csv from 'csv-parser'
import youtubedl from 'youtube-dl'
import { promisify } from 'util'
import { Readable } from 'stream'
import { fetchVine, fetchCreator } from '../../utils/uploadService'
import { Mongoose } from 'mongoose'

import { Creator, ICreator } from '../../models/Creator';
import { Vine, IVine } from '../../models/Vine';


const router = express.Router()
const vineArchive = "https://archive.vine.co"
const getYoutubeInfo = promisify(youtubedl.getInfo)

router.post('/upload/vine', async (req, res, next) => {
	try {
		await uploadVine(req.body)

		res.json({
			message: "Vine successfully created"
		})
	} catch(e) {
		next(createError(500, `${e.name}: ${e.message}`))
	}
})

router.post('/upload/youtube', async (req, res, next) => {
	try {
		await uploadYoutube(req.body)

		res.json({
			message: "Vine sucessfully created"
		})
	} catch(e) {
		next(createError(500, `${e.name}: ${e.message}`))
	}
})

router.post('/upload/video', async (req, res, next) => {
	try {
		await uploadVideo(req.body)

		res.json({
			message: "Vine created successfully"
		})
	} catch(e) {
		next(createError(500, `${e.name}: ${e.message}`))
	}
})

router.post('/upload/csv', async (req, res, next) => {
	const rawCSV = decodeURIComponent(escape(Buffer.from(req.body.file, 'base64').toString('binary')))
	const results: Array<any> = []

	Readable
		.from([rawCSV])
		.pipe(csv(['title', 'description', 'url', 'author_url']))
		.on('data', (data) => results.push(data))
		.on('end', async () => {
			for(const row of results) {
				if(row.url.match(/https:\/\/vine.co/g)) {
					try {
						await uploadVine(row)
					} catch(e) {
						console.log(e)
					}
				}
			}
		})

	res.json({
		message: "CSV imported successfully"
	})
})

const uploadVine = async (data: any) => {
	if(!data.url.match(/https:\/\/vine.co/g)) {
		throw new Error("Vine url is not valid")
	}

	const vineId = data.url.replace('https://vine.co/v/', '').replace('/', '')

	if(await (Vine.findOne({videoId: vineId}).exec())) {
		throw new Error("Could not add vine, vine ID already taken")
	}

	const resp = await fetch(`${vineArchive}/posts/${vineId}.json`)

	if(!resp.ok) {
		throw new Error("Could not fetch vine info from Vine's archive")
	}

	const vineJson = await resp.json()

	let creatorId = data.author_url ? data.author_url.replace('https://vine.co/u/', '') : ''
	creatorId = creatorId ? creatorId : vineJson.userIdStr

	const creator = await createOrFindCreator(creatorId)

	await fetchVine(vineId, vineJson.videoUrl, vineJson, 'vine')

	const vine = new Vine({
		videoId:		vineId,
		title: 			data.title,
		description:	data.description,
		url:			data.url,
		creator:		creator._id
	})

	await vine.save()
}

const uploadYoutube = async (data: any) => {
	if(!data.url.match(/youtube.com/g)) {
		throw new Error("Youtube url is not valid")
	}

	const youtubeJson: any = await getYoutubeInfo(data.url)

	const videoId = youtubeJson.id
	const videoUrl = `https://youtube.com/watch?v=${youtubeJson.id}`

	if(await (Vine.findOne({videoId: videoId}).exec())) {
		throw new Error("Could not add vine, vine ID already taken")
	}

	const creatorId = data.author_url ? data.author_url.replace('https://vine.co/u/', '') : ''
	const creator: ICreator  = await createOrFindCreator(creatorId)

	await fetchVine(videoId, videoUrl, youtubeJson, 'youtube')

	const vine: IVine = await Vine.create({
		videoId:		videoId,
		title: 			data.title,
		description:	data.description,
		url:			data.ur
	})

	if(creator) {
		vine.creator = creator._id
	}

	await vine.save()
}

const uploadVideo = async (data: any) => {
	let videoId = ''

	if(data.url.match(/https:\/\/vine.co/g)) {
		videoId = data.url.replace('https://vine.co/v/', '').replace('/', '')
	}

	if(data.url.match(/youtube.com/)) {
		const youtubeJson: any = await getYoutubeInfo(data.url)
		videoId = youtubeJson.id
	}

	if(!videoId) {
		videoId = generateId(11)
	}

	const creatorId = data.author_url ? data.author_url.replace('https://vine.co/u/', '') : ''

	const creator: ICreator = await createOrFindCreator(creatorId)

	await fetchVine(videoId, data.file, null, 'video')

	const vine = new Vine({
		videoId:		videoId,
		title: 			data.title,
		description:	data.description,
		url:			data.url
	})

	if(creator) {
		vine.creator = creator._id
	}

	await vine.save()
}

const createOrFindCreator = async (creatorId: string): Promise<ICreator> => {
	let creator: ICreator = null

	if(creatorId) {
		const resp = await fetch(`${vineArchive}/profiles/_/${creatorId}.json`)

		if(!resp.ok) {
			throw new Error("Could not fetch creator info from Vine's archive")
		}

		const creatorJson = await resp.json()
		await fetchCreator(creatorId, creatorJson)

		creator = await (Creator.findOne({creatorId: creatorId}))

		if(!creator) {
			creator = await Creator.create({
				creatorId: creatorId,
				username: creatorJson.username,
				url: creatorJson.shareUrl
			})

			await creator.save()
		}
	}

	return creator
}

const generateId = (length: number) => {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	let id = ''

	for(var i = 0; i < length; i++) {
        id += charset.charAt(Math.floor(Math.random() * charset.length))
	}

    return id
}

export default router
