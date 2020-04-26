<template>
	<div>
		<VineSearch 
			@searchChanged="searchChanged"
		/>
		<VineList
			:vines="vines"
		/>
	</div>
</template>

<script>
import VineSearch from './VineSearch'
import VineList from './VineList'

export default {
	name: 'VineContainer',
	props: ['vines'],
	methods: {
		searchChanged(query) {
			this.$emit('searchChanged', query)
		}
	},
	mounted() {
	},
	components: {
		VineSearch,
		VineList
	}
}
</script>

<style lang="scss" scoped>
</style>