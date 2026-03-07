<script setup lang="ts">
import IconLink from '@/components/IconLink.vue'
import ArticleContent from '@/components/ArticleContent.vue'
import BackButton from '@/components/BackButton.vue'

import { ref, type Ref } from 'vue'
import type Project from '@/classes/Project'
import Info from '@/classes/Info'
const props = defineProps<{
	projectName: string
}>()

const project: Ref<Project> = ref<Project>(
	Info.projects.find(
		(project) => project.title.toLowerCase() === props.projectName.toLowerCase(),
	) as Project,
)
</script>
<template>
	<div class="projectDetailView">
		<div class="margins">
			<div class="project-header">
				<BackButton
					label="all projects"
					route="/projects"
				/>
				<div class="header-content">
					<h1 class="project-title">{{ project.title }}</h1>
					<p class="project-year">{{ project.year }}</p>
				</div>
				<div class="skills">
					<span v-for="skill in project.skills" :key="skill" class="skill">
						{{ skill }}
					</span>
				</div>
			</div>

			<div class="project-info">
				<p class="project-description boxP">{{ project.description }}</p>
				<div
					class="links"
					v-if="project.githubLink || project.steamLink || project.siteLink"
				>
					<IconLink
						v-if="project.githubLink"
						icon="fa-brands fa-github"
						:route="project.githubLink"
						external
						>GitHub</IconLink
					>
					<IconLink
						v-if="project.steamLink"
						icon="fa-brands fa-steam"
						:route="project.steamLink"
						external
						>Steam</IconLink
					>
					<IconLink
						v-if="project.siteLink"
						icon="fa-solid fa-globe"
						:route="project.siteLink"
						external
						>Live Site</IconLink
					>
				</div>
			</div>
		</div>

		<ArticleContent v-if="project.articlePath" :articlePath="project.articlePath" />
	</div>
</template>
<style scoped>
.projectDetailView {
	padding: var(--gap) 0;
	min-height: 100vh;
}

.project-header {
	padding: calc(var(--gap) * 2) 0;
	border-bottom: 1px solid var(--border);
	margin-bottom: var(--gap);
}

.header-content {
	display: flex;
	align-items: baseline;
	gap: var(--gap);
	margin-bottom: var(--gap);
	margin-top: var(--gap);
	flex-wrap: wrap;
}

.project-title {
	margin: 0;
	font-size: 3rem;
	font-weight: 700;
	color: var(--text);
}

.project-year {
	margin: 0;
	font-size: 1.5rem;
	color: var(--sec-text);
	font-family: var(--mono-font);
}

.skills {
	display: flex;
	flex-wrap: wrap;
	gap: var(--minor-gap);
}

.skill {
	font-family: var(--mono-font);
	display: inline-block;
	background-color: var(--border);
	color: var(--text);
	padding: 5px var(--minor-gap);
	border-radius: 5px;
	font-size: 14px;
	transition: background-color 0.2s ease;
}

.project-info {
	display: flex;
	flex-direction: column;
	gap: var(--gap);
	margin-bottom: calc(var(--gap) * 2);
}

.project-description {
	font-size: 1.1rem;
	line-height: 1.6;
	margin: 0;
}

.links {
	display: flex;
	gap: var(--minor-gap);
	flex-wrap: wrap;
}

@media (max-width: 768px) {
	.project-title {
		font-size: 2rem;
	}

	.project-year {
		font-size: 1.2rem;
	}

	.header-content {
		gap: var(--minor-gap);
	}
}
</style>
