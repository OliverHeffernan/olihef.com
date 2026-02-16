<script setup lang="ts">
import SplashScreen from '@/sections/SplashScreen.vue'
import AboutMe from '@/sections/AboutMe.vue'
import TopProjects from '@/sections/TopProjects.vue'
</script>
<template>
	<SplashScreen />
	<div class="other-sections">
		<AboutMe />
		<TopProjects />
	</div>
</template>
<style scoped>
.other-sections {
	position: relative;
	width: 100%;
	z-index: 1000;
	background-color: var(--bg);
	/*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
	border: 1px solid var(--border);
}
</style>
