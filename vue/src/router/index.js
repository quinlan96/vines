import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Playlist from '@/views/Playlist'
import Upload from '@/views/Upload'
import Creators from '@/views/Creators'
import CreatorProfile from '@/views/CreatorProfile'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/playlist',
		name: 'Playlist',
		component: Playlist
	},
	{
		path: '/creators',
		name: 'Creators',
		component: Creators
	},
	{
		path: '/upload',
		name: 'Upload',
		component: Upload
	},
	{
		path: '/creator/:id',
		name: 'CreatorProfile',
		component: CreatorProfile
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
