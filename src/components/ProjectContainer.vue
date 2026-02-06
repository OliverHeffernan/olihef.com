<script setup lang="ts">
import type Project from '@/classes/Project';
defineProps<{
	project: Project
}>()
</script>
<template>
	<div class="project-container">
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
	background-color: rgb(255, 255, 255);
	padding: 15px;
	border-radius: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.skill {
	display: inline-block;
	background-color: rgb(220, 220, 220);
	padding: 5px 10px;
	border-radius: 5px;
	margin-right: 5px;
	font-size: 12px;
	border: 1px solid rgb(200, 200, 200);
}
</style>
