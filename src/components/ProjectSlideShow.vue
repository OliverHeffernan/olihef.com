<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import ProjectContainer from './ProjectContainer.vue'
import type Project from '@/classes/Project'

const slide: Ref<number> = ref<number>(0)

const props = defineProps<{
	projects: Project[],
	fullScreen: boolean
}>()

const gap = 10 // gap in pixels

// Calculate the offset including the gap
const slideOffset = computed(() => {
	return slide.value * 170 + slide.value * gap
})

function goToSlide(index: number) {
	console.log(index)
	slide.value = index
}
</script>
<template>
	<div class="slideShow" v-if="!fullScreen">
		<div class="buttons">
			<button
				v-for="index in projects.length"
				:key="index"
				class="slideBtn"
				:class="{
					active: index - 1 === slide,
				}"
				@click="goToSlide(index - 1)"
			/>
		</div>
		<div class="slides-container">
			<div
				class="slides"
				:style="{ transform:
					`translateY(calc(-${slideOffset}px))` }"
			>
				<div v-for="(project, index) in projects" :key="index" class="slide">
					<ProjectContainer :project="project" />
				</div>
			</div>
		</div>
	</div>
	<div class="projects-container" v-else>
		<ProjectContainer
			v-for="(project, index) in projects"
			:key="index"
			:project="project"
		/>
	</div>
</template>
<style scoped>
.slideShow {
	display: flex;
	flex-direction: row;
	gap: 10px;
	height: 180px;
}

.buttons {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 0.5rem;
}

.slideBtn {
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: var(--sec-text);
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.slideBtn:hover {
	background-color: var(--text-hover);
}

.slides-container {
	position: relative;
	flex: 1;
	min-width: 0;
	overflow: hidden;
	height: 100%;
}

.slides {
	display: flex;
	flex-direction: column;
	gap: 10px;
	transition: transform 0.5s ease-in-out;
}

.slide {
	height: 170px;
	box-sizing: border-box;
	flex-shrink: 0;
}

.active {
	background-color: var(--active);
}

.projects-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
