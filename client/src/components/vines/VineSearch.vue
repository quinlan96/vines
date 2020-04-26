<template>
	<div class="vine-search">
		<router-link to="/playlist"><font-awesome-icon icon="play" /></router-link>
		<input placeholder="Search..." v-model="search" @change="inputChanged" />
		<font-awesome-icon icon="filter" />
	</div>
</template>

<script>
export default {
	name: 'VineSearch',
	data() {
		return {
			search: ''
		}
	},
	methods: {
		inputChanged(e) {
			this.$emit('searchChanged', e.target.value)
		}
	},
	mounted() {
	},
	components: {
	}
}
</script>

<style lang="scss" scoped>
.vine-search {
	display: flex;
	padding: 2rem 0;
}

.vine-search input {
	flex-grow: 1;
	font-size: 1.5rem;
	padding: .5rem;
	margin: 0 1rem;
	border: none;
	border-radius: .5rem;
}

.vine-search svg {
	vertical-align: middle;
	color: #fff;
	font-size: 2rem;
	height: 3rem;
}
</style>
