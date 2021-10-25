<template>
	<div class="playlist-container">
		<div class="playlist-video">
			<video ref="video" class="video-js playlist-video">
			</video>
		</div>
	</div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-playlist'

import { get } from '@/utils/api'

export default {
	name: 'VinePlaylist',
	props: ['vines'],
	data () {
		return {
			player: null
		}
	},
	methods: {
		async getVines() {
			this.vines = await get('vines')
			this.loadPlaylist()
		},
		loadPlaylist() {
			this.player.playlist(this.vines.map((vine) => {
				return {
					sources: [{
						src: `${vine.vineUrl}`,
						type: 'video/mp4'
					}],
					poster: `${vine.thumbnailUrl}`
				}
			}))

			this.player.playlist.autoadvance(0)
		}
	},
	mounted() {
		const options = {
			controls: true,
			autoplay: true,
			fluid: true,
			aspectRatio: '1:1'
		}

		this.getVines()

		this.player = videojs(this.$refs.video, options, () => {})
	}
}
</script>

<style scoped>
.playlist-container {
	max-width: 1280px;
	margin: 0 auto;  
}

.playlist-video {
	width: 100vh;
	margin: 0 auto;
}

.video-js >>> button.vjs-big-play-button {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
