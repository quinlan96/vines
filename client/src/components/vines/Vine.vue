<template>
  <div class="vine">
	<video :class="videoClass" ref="video" loop v-on:click="toggleVideo">
      <source :src="vine.vineUrl" type="video/mp4">
    </video>
	<img :class="imageClass" v-on:click="loadVideo" :src="vine.thumbnailUrl"  />
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
	computed: {
		videoClass() {
			return !this.clicked ? 'hidden': ''
		},

		imageClass() {
			return this.clicked ? 'hidden' : ''
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

<style lang="scss" scoped>
.vine {
	display: flex;
	width: 33.3333%;
	cursor: pointer;
	padding: .5rem;
}

.vine > img {
	width: 100%;

	&.hidden {
		display: none;
	}
}

.vine video {
	width: 100%;

	&.hidden {
		display: none;
	}
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
