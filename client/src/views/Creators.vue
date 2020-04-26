<template>
	<div>
		<Navbar />
		<CreatorList :creators="creators" class="container" />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import CreatorList from '@/components/creators/CreatorList.vue'
import { get } from '@/utils/api'

export default {
	name: 'Home',
	data() {
		return {
			creators: []
		}
	},
	methods: {
		async getCreators() {
			this.creators = await get('/creators')
		}
	},
	mounted() {
		this.getCreators()
	},
	components: {
		Navbar,
		CreatorList
	}
}
</script>
