<template>
  <div class="vine">
	<video v-if="clicked" ref="video" loop autoplay v-on:click="toggleVideo">
      <source :src="vine.vineUrl" type="video/mp4">
    </video>
	<img v-if="!clicked" v-on:click="loadVideo" :src="vine.thumbnailUrl" />
  </div>
</template>

<script>
export default {
	name: 'Vine',
	props: ['vine'],
	data() {
		return {
			clicked: false,
			dataDir: ''
		}
	},
	methods: {
		toggleVideo() {
			if (this.$refs.video.paused) {
				this.$refs.video.play()
			} else {
				this.$refs.video.pause()
			}
		},
		loadVideo() {
			this.clicked = true
		}
	},
	mounted() {
		this.dataDir = `${process.env.VUE_APP_API_STATIC}/${this.vine.videoId}`
	}
}
</script>

<style scoped>
.vine {
	display: flex;
	width: 33.3333%;
	cursor: pointer;
}

.vine video {
	width: 100%;
}

video::-internal-media-controls-overlay-cast-button {
	display: none;
}

@media screen and (max-width: 500px) {
	.vine {
		width: 50%;
	}
}
</style>
