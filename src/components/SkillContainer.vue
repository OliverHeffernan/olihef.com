<template>
	<div
		class="skill-container"
		:class="{
			fullScreen: fullScreen,
			small: !fullScreen,
			visible: visible,
		}"
		v-if="skill"
	>
		<button
			class="close-button"
			type="button"
			aria-label="Close skill details"
			@click="emit('close')"
		>
			<i class="fa-solid fa-xmark" aria-hidden="true"></i>
		</button>
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
import { ref, watch, type Ref } from 'vue'
import Info from '@/classes/Info'
import ProjectSlideShow from './ProjectSlideShow.vue'

const props = defineProps<{
	skillKey: string
	visible: boolean
}>()

const emit = defineEmits<{
	(event: 'close'): void
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
	top: var(--border-radius);
	left: 50%;
	transform: translate(-50%, calc(-100% - var(--gap)));
	background-color: var(--bg);
	border: 1px solid var(--border);
	border-radius: var(--major-border-radius);
	overflow: hidden;
	z-index: 500;
	transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-container.visible {
	transform: translate(-50%, 0);
}

.close-button {
	position: absolute;
	top: 8px;
	right: 8px;
	width: 44px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0;
	border-radius: 50%;
	background: var(--bg);
	color: var(--text);
	cursor: pointer;
	z-index: 11;
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

.fullScreen.visible {
	transform: none;
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

@media (max-width: 480px), (hover: none), (pointer: coarse) {
	.skill-container.small {
		width: calc(100% - var(--gap));
		height: min(320px, calc(100dvh - 110px));
		border-radius: var(--major-border-radius);
	}

	.content {
		padding: 16px;
		padding-top: 12px;
	}

	.skill-container .title {
		align-items: center;
		padding-right: 42px;
	}

	.skill-container .title h2 {
		font-size: 1.2rem;
	}

	.skill-container .title i {
		font-size: 48px;
	}

	.skill-container img {
		width: 48px;
		height: 48px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.skill-container {
		transition: none;
	}
}
</style>
