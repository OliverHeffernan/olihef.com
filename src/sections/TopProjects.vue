<script setup lang="ts">
import ProjectContainer from '@/components/ProjectContainer.vue'
import Info from '@/classes/Info'
import { useScrollReveal, useStaggerReveal } from '@/composables/useScrollAnimations'
const options = {
	duration: 0.5,
	delay: 0.1,
}
useScrollReveal('#topProjectsHeader', options)
useStaggerReveal('.project-container', { ...options, delay: 0.3, stagger: 0.2 })

const topProjects = Info.projects.filter((project) => project.topProject)
</script>
<template>
	<div class="topProjects">
		<div class="margins">
			<h2 class="boxHeader" id="topProjectsHeader">
				<i class="fa-solid fa-star"></i>
				Top Projects
			</h2>
			<div class="projects">
				<ProjectContainer
					v-for="(project, index) in topProjects"
					:key="index"
					:project="project"
				/>
			</div>
		</div>
	</div>
</template>
<style scoped>
.topProjects {
	box-sizing: border-box;
	margin-top: 20px;
	padding-top: 20px;
	padding-bottom: 20px;
	border-top: 1px solid var(--border);
}

.projects {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	gap: 20px;
}

.projects > * {
	flex: 1 1 calc(50% - 20px);
	box-sizing: border-box;
}

h2 i {
	color: var(--yellow);
}
</style>
