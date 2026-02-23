<template>
	<div
		ref="containerRef"
		class="skill-container"
		:class="{
			fullScreen: fullScreen,
			small: !fullScreen,
		}"
		v-if="skill"
	>
		<!--
		<div class="button-container">
			<i v-if="!fullScreen" class="fa-solid fa-expand exButton" @click="fullScreen = true"></i>
			<i v-if="fullScreen" class="fa-solid fa-compress exButton" @click="fullScreen = false"></i>
		</div>
		-->
		<div class="content">
			<div class="title">
				<i
					v-if="skill.icon === 'rust/rust-original'"
					class="devicon-rust-original display"
				></i>
				<img
					v-else
					class="display"
					:src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}.svg`"
				/>
				<h2>{{ skill.name }}</h2>
			</div>
			<ProjectSlideShow :projects="projects" :fullScreen="fullScreen" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue'
import gsap from 'gsap'
import Info from '@/classes/Info'
import ProjectSlideShow from './ProjectSlideShow.vue'

const props = defineProps<{
	skillKey: string
	visible: boolean
}>()

const fullScreen: Ref<boolean> = ref(false)
const containerRef: Ref<HTMLElement | null> = ref(null)

// Disable body scroll when fullscreen
watch(fullScreen, (isFullScreen) => {
	if (isFullScreen) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = ''
	}
})

// Animate visibility with GSAP
watch(
	() => props.visible,
	(isVisible) => {
		if (!containerRef.value) return

		if (isVisible) {
			gsap.to(containerRef.value, {
				top: 'var(--border-radius)',
				duration: 0.5,
				ease: 'power2.out',
			})
		} else {
			gsap.to(containerRef.value, {
				top: '-100%',
				duration: 0.4,
				ease: 'power2.in',
			})
		}
	},
)

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
	border-radius: var(--major-border-radius);
	overflow: hidden;
}

.button-container {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 10;
	padding: var(--gap);
}

.content {
	display: flex;
	flex-direction: column;
	gap: var(--minor-gap);
	padding: var(--gap);
	height: 100%;
	overflow: hidden;
}

.small {
	width: min(calc(100% - var(--minor-gap) * 2), 500px);
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
	gap: var(--minor-gap);
}

.skill-container .title i {
	font-size: 70px;
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
