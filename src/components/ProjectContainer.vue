<script setup lang="ts">
import type Project from '@/classes/Project';
defineProps<{
	project: Project
	inSlideShow?: boolean
}>()

</script>
<template>
	<div
		class="project-container"
		:class="{ 'inSlideshow': inSlideShow }"
	>
		<h3>{{ project.title }}</h3>
		<p>{{ project.description }}</p>
		<div class="skills">
			<span
				v-for="skill in project.skills"
				:key="skill"
				class="skill"
			>
				{{ skill }}
			</span>
		</div>
	</div>
</template>
<style scoped>
.project-container {
	display: block;
	box-sizing: border-box;
	background-color: var(--bg);
	padding: 15px;
	border-radius: 10px;
	border: 1px solid var(--border);
}

.inSlideShow {
	height: 170px;
}

.skill {
	display: inline-block;
	background-color: var(--border);
	padding: 5px 10px;
	border-radius: 5px;
	margin-right: 5px;
	font-size: 12px;
}

h3 {
	margin: 0;
}
</style>
