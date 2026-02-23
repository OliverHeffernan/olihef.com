<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
	imageName: string
	alt: string
	width: string
	height: string
	profile?: boolean
}>()

const imgSrc = computed(() => {
	return new URL(`../assets/${props.imageName}`, import.meta.url).href
})
</script>
<template>
	<div
		class="image"
		:class="{
			profile: profile,
			notProfile: !profile
		}"
	>
		<img
			:src="imgSrc"
			:alt="alt"
			class="boxImg"
			:width="width"
			:height="height"
		/>
	</div>
</template>
<style scoped>
.image {
	padding: var(--border-radius);
	border: 1px solid var(--border);
	border-radius: var(--border-radius);
}

.notProfile {
	border: 1px solid var(--border);
}

.boxImg {
	border-radius: calc(var(--border-radius) / 2);
	margin: 0;
}


@media (max-width: 600px) {
	.profile {
		display: flex;
		border: none;
		justify-content: center;
	}

	.profile .boxImg {
		width: 40vw;
		height: 40vw;
		border-radius: 50%;
	}
}

</style>
