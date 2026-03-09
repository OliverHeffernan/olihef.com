<script setup lang="ts">
import ProjectContainer from '@/components/ProjectContainer.vue'
import { RouterLink } from 'vue-router'
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
				Top Projects -
				<RouterLink
					to="/projects"
					class="seeAll"
				>see all</RouterLink>
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
	padding-top: var(--gap);
	padding-bottom: var(--gap);
	border-top: 1px solid var(--border);
	border-bottom: 1px solid var(--border);
}

.projects {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	gap: var(--gap);
}

.projects > * {
	flex: 1 1 calc(50% - var(--gap));
	box-sizing: border-box;
}

h2 i {
	color: var(--yellow);
}

.seeAll {
	color: var(--accent);
}

.margins {
	padding: var(--major-gap) 0;
}
</style>
