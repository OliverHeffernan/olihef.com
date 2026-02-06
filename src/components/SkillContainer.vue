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
		<div class="button-container">
			<i v-if="!fullScreen" class="fa-solid fa-expand exButton" @click="fullScreen = true"></i>
			<i v-if="fullScreen" class="fa-solid fa-compress exButton" @click="fullScreen = false"></i>
		</div>
		<div class="content">
			<div class="title">
				<img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}.svg`" />
				<h2>{{ skill.name }}</h2>
			</div>
			<ProjectSlideShow
				:projects="projects"
				:fullScreen="fullScreen"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import Info from '@/classes/Info'
import ProjectSlideShow from './ProjectSlideShow.vue'

const props = defineProps<{
	skillKey: string
	visible: boolean
}>()

const fullScreen: Ref<boolean> = ref(false)

// Disable body scroll when fullscreen
watch(fullScreen, (isFullScreen) => {
	if (isFullScreen) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = ''
	}
})

const skill = Info.skills.get(props.skillKey)
const projects = Info.projects.filter((project) => project.skills.includes(props.skillKey))
</script>
<style scoped>
.skill-container {
	position: absolute;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	top: -100%;
	background-color: var(--bg);
	border: 1px solid var(--border);
	transition:
		top 0.3s ease-out,
		width 0.3s ease-out,
		height 0.3s ease-out,
		left 0.3s ease-out,
		transform 0.3s ease-out,
		border-radius 0.3s ease-out;
	border-radius: 20px;
	overflow: hidden;
}

.button-container {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 10;
	padding: 20px;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px;
	height: 100%;
	overflow: hidden;
}

.small {
	width: min(calc(100% - 20px), 500px);
	left: 50%;
	transform: translateX(-50%);
	height: 290px;
	overflow: hidden;
}

.fullScreen {
	width: 100%;
	height: 100%;
	left: 0;
	top: 0 !important;
	transform: none;
	z-index: 1001;
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

.exButton {
	font-size: 20px;
	cursor: pointer;
}
</style>
