<script setup lang="ts">
import IconLink from '@/components/IconLink.vue'

import { ref, type Ref } from 'vue'
import type Project from '@/classes/Project'
import Info from '@/classes/Info'
const props = defineProps<{
	projectName: string
}>()

const project: Ref<Project> = ref<Project>(
	Info.projects.find(
		(project) => project.title.toLowerCase() === props.projectName.toLowerCase()
	) as Project
)
</script>
<template>
	<div class="projectDetailView margins">
		<h1 class="boxHeader">{{ project.title }}</h1>
		<p class="boxP">{{ project.description }}</p>
		<div class="links">
			<IconLink
				v-if="project.githubLink"
				icon="fa-brands fa-github"
				:route="project.githubLink"
				external
			>GitHub</IconLink>
			<IconLink
				v-if="project.steamLink"
				icon="fa-brands fa-steam"
				:route="project.steamLink"
				external
			>Steam</IconLink>
			<IconLink
				v-if="project.siteLink"
				icon="fa-solid fa-globe"
				:route="project.siteLink"
				external
			>Live Site</IconLink>
		</div>
	</div>
</template>
<style scoped>
.links {
	display: flex;
	gap: 10px;
	margin-top: 10px;
}
</style>
