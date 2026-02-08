<script setup lang="ts">
import ProjectContainer from '@/components/ProjectContainer.vue'
import Info from '@/classes/Info'

const topProjects = Info.projects.filter(
	(project) => project.topProject
)
</script>
<template>
	<div class="topProjects">
		<div class="margins">
			<h2 class="boxHeader">Top Projects</h2>
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
</style>
