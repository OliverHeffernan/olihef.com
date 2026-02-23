<script setup lang="ts">
import ProjectContainer from '@/components/ProjectContainer.vue'
import TitleSplash from '@/components/TitleSplash.vue'
import Info from '@/classes/Info'
</script>
<template>
	<TitleSplash
		profile
		title="Projects"
	/>
	<div class="allProjects">
		<div class="margins">
			<h2 class="boxHeader">All Projects</h2>
			<div class="projects">
				<ProjectContainer
					v-for="(project, index) in Info.projects"
					:key="index"
					:project="project"
				/>
			</div>
		</div>
	</div>
</template>
<style scoped>
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

.margins {
	padding-bottom: var(--gap);
}
</style>
