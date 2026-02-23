<template>
	<div class="container">
		<div v-if="profile" class="fixedImgsCont">
			<img
				src="../assets/profile_picture.jpeg"
				alt="Profile Picture"
				class="fixedImg profile"
			/>
		</div>
		<GridBackground />
		<h1 class="title">{{ title }}</h1>
	</div>
</template>
<script setup lang="ts">
import { useParallax, useHorizontalParallax } from '@/composables/useScrollAnimations'
import { useSwoopIn } from '@/composables/useLoadAnimations'
useSwoopIn('.fixedImg', { delay: 0.5, duration: 0.5 })
import GridBackground from './GridBackground.vue'

useParallax('.title', { speed: 5 })
useHorizontalParallax('.title', { speed: -15 })

defineProps<{
	title: string
	profile?: boolean
}>()
</script>
<style scoped>
.container {
	height: 200vh;
	position: relative;
	overflow: hidden;
	border-bottom: 1px solid var(--border);
}

.title {
	position: absolute;
	top: 50vh;
	left: 0;
	right: 0;
	font-size: 30rem;
	text-align: center;
	text-wrap: nowrap;
	margin: 0;
	padding-left: 50%;
	opacity: 0.2;
}

.fixedImgsCont {
	position: absolute;
	top: 20vh;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	z-index: 10;
}

.fixedImg {
	border-radius: 50%;
	border: 1px solid var(--border);
	width: 30vh;
	height: 30vh;
	object-fit: cover;
}
</style>
