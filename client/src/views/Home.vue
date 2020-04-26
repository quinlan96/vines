<template>
	<div class="home">
		<Navbar />
		<VineContainer
			:vines="vines"
			@searchChanged="searchChanged"
			class="container"
		/>
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import VineContainer from '@/components/vines/VineContainer.vue'
import { get } from '@/utils/api'

export default {
	name: 'Home',
	data() {
		return {
			vines: [],
			query: ''
		}
	},
	methods: {
		async getVines() {
			this.vines = await get('/vines')
		},
		async searchChanged(query) {
			this.vines = await get(`/vines?q=${query}`)
		}
	},
	mounted() {
		this.getVines()
	},
	components: {
		Navbar,
		VineContainer
	}
}
</script>
