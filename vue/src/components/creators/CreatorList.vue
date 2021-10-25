<template>
	<div class="container">
		<div class="creators-container">
			<CreatorItem v-for="creator in creators" :creator="creator" v-bind:key="creator.id" />
		</div>
	</div>
</template>

<script>
import CreatorItem from '@/components/creators/CreatorItem'

export default {
	name: 'CreatorList',
	props: ['creators'],
	methods: {
	},
	mounted() {
	},
	components: {
		CreatorItem
	}
}
</script>

<style lang="scss" scoped>
.creators-container {
	display: flex;
	flex-wrap: wrap;
}
</style>
