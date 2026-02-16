<script setup lang="ts">
import { useParallax } from '@/composables/useScrollAnimations';
useParallax('.gridBackground', { y: 50, speed: 0.9, scrub: 2 });
useParallax('.gridBackground.secondary', { y: 25, speed: 1.3, scrub: 2 });
</script>
<template>
	<div class="gridBackground primary"></div>
</template>
<style scoped>
.gridBackground {
	position: absolute;
	top: -50vh;
	left: 0;
	width: 100%;
	height: 200vh;
	background-color: var(--bg);
	/*background-position: 0 calc(100vh + 1px);*/
	background-position: calc(50vw) calc(100vh + 1px);
	background-image:
		linear-gradient(to right, var(--border) 1px, transparent 1px),
		linear-gradient(to bottom, var(--border) 1px, transparent 1px);
	background-size: 70px 70px;
}

</style>
