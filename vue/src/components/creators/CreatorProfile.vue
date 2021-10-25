<template>
	<div>
		<div class="creator-profile">
			<img :src="creator.thumbnailUrl" />
			<div class="creator-profile-username">
				<h1>{{ creator.username }}</h1>
			</div>
		</div>
		<VineList :vines="creator.vines" />
	</div>
</template>

<script>
import VineList from '@/components/vines/VineList'

export default {
	name: 'CreatorProfile',
	props: ['creator'],
	methods: {
	},
	mounted() {
	},
	components: {
		VineList
	}
}
</script>

<style lang="scss" scoped>
.creator-profile {
	display: flex;
	margin: 2rem 0;
	align-items: center;
}

.creator-profile img {
	height: 12rem;
	border-radius: 50%;
	margin-right: 2rem;
}

.creator-profile-username {
	flex-grow: 1;
}
</style>