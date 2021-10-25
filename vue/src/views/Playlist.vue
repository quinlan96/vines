<template>
	<div>
		<Navbar />
		<VinePlaylist />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import VinePlaylist from '@/components/vines/VinePlaylist.vue'

export default {
	name: 'Playlist',
	mounted() {
	},
	components: {
		Navbar,
		VinePlaylist
	}
}
</script>
