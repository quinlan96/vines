<template>
	<div class="creator-container">
		<router-link :to="`/creator/${creator.creatorId}`">
			<div class="card creator-item bg-dark">
				<div v-if="!creator.thumbnailUrl" class="card-img-top">
					<font-awesome-icon icon="user" />
				</div>
				<img v-if="creator.thumbnailUrl" class="card-img-top" :src="creator.thumbnailUrl" />
				<div class="card-body">
					<h5 class="card-title">
						{{ creator.username }}
					</h5>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'CreatorItem',
	props: ['creator'],
	methods: {
	},
	mounted() {
	},
	components: {
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.creator-container {
	box-sizing: border-box;
	width: 33.333%;
	padding: 1rem;
}

.creator-item {
	width: 100%;
	color: #fff;
}

.creator-item a:hover {
	text-decoration: none;
}

.creator-item div.card-img-top {
	background-color: $gray-600;
	width: 100%;
	padding-top: 100%;
	position: relative;

	svg {
		position: absolute;
		font-size: 10rem;
		bottom: 30%;
		left: 50%;
		transform: translate(-50%, 20%)
	}
}
</style>