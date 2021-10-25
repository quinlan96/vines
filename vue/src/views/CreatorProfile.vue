<template>
	<div>
		<Navbar />
		<CreatorProfile :creator="creator" class="container" />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CreatorProfile from '@/components/creators/CreatorProfile.vue'
import { get } from '@/utils/api'

export default {
	name: 'Home',
	data() {
		return {
			creator: null
		}
	},
	methods: {
		async getCreator(id) {
			this.creator = await get(`/creator/${id}`)
		}
	},
	mounted() {
		this.getCreator(this.$route.params.id)
	},
	components: {
		Navbar,
		CreatorProfile
	}
}
</script>
