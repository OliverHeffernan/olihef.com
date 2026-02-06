<script setup lang="ts">
import SplashScreen from '@/sections/SplashScreen.vue'
import AboutMe from '@/sections/AboutMe.vue'
</script>
<template>
	<SplashScreen />
	<div class="other-sections">
		<AboutMe />
	</div>
</template>
<style scoped>
.other-sections {
	position: absolute;
	top: 95vh;
	left: 0;
	width: 100%;
	z-index: 1000;
	background-color: var(--bg);
	/*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
	border: 1px solid var(--border);
}
</style>
