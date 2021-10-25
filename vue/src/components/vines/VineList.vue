<template>
	<div class="vines-container">
		<Vine v-for="vine in vines" :vine="vine" v-bind:key="vine.id" />
	</div>
</template>

<script>
import Vine from './Vine'

export default {
	name: 'VineList',
	props: ['vines'],
	methods: {
	},
	mounted() {
	},
	components: {
		Vine
	}
}
</script>

<style lang="scss" scoped>
.vines-container {
	display: flex;
	flex-wrap: wrap;
}
</style>
