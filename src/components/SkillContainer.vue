<template>
	<div
		class="skill-container"
		:class="{
			visible: visible,
			fullScreen: fullScreen,
			small: !fullScreen,
		}"
		v-if="skill"
	>
		<i v-if="!fullScreen" class="fa-solid fa-expand" @click="fullScreen = true"></i>

		<i v-if="fullScreen" class="fa-solid fa-compress" @click="fullScreen = false"></i>
		<div class="title">
			<img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}.svg`" />
			<h2>{{ skill.name }}</h2>
		</div>
		<ProjectContainer v-for="project in projects" :key="project.title" :project="project" />
	</div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Info from '@/classes/Info'
import ProjectContainer from './ProjectContainer.vue'
const props = defineProps<{
	skillKey: string
	visible: boolean
}>()

const fullScreen: Ref<boolean> = ref(false)

const skill = Info.skills.get(props.skillKey)
const projects = Info.projects.filter((project) => project.skills.includes(props.skillKey))
</script>
<style scoped>
.skill-container {
	position: fixed;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px;
	top: -100%;
	background-color: rgb(240, 240, 240);
	transition:
		top 0.3s ease-out,
		width 0.3s ease-out,
		height 0.3s ease-out,
		left 0.3s ease-out,
		transform 0.3s ease-out,
		border-radius 0.3s ease-out;
	border-radius: 20px;
	overflow: auto;
}

.small {
	width: min(calc(100% - 20px), 500px);
	left: 50%;
	transform: translateX(-50%);
	height: 30%;
}

.fullScreen {
	width: 100%;
	height: 100%;
	left: 0;
	top: 0 !important;
	transform: none;
	z-index: 1000;
	padding: none;
	border-radius: 0;
}

.skill-container .title {
	display: flex;
	flex-direction: row;
	gap: 10px;
}

.skill-container.visible {
	top: 10px;
}

.skill-container img {
	width: 70px;
	height: 70px;
}
</style>
