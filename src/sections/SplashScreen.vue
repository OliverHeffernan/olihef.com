<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import RotIcons from '@/components/RotIcons.vue'
import SkillTip from '@/components/SkillTip.vue'
import SkillContainer from '@/components/SkillContainer.vue'

const skill: Ref<string> = ref<string>('')
const displayedSkill: Ref<string> = ref<string>('')
const isVisible: Ref<boolean> = ref<boolean>(false)

const boost: Ref<boolean> = ref<boolean>(false)
const progress: Ref<number> = ref<number>(0)
const isComplete: Ref<boolean> = ref<boolean>(false)
let progressInterval: number | null = null

const startBoost = () => {
	boost.value = true
	progress.value = 0
	isComplete.value = false

	const duration = 1500 // 1.5 seconds
	const startTime = Date.now()

	const animate = () => {
		const elapsed = Date.now() - startTime
		const newProgress = Math.min((elapsed / duration) * 100, 100)

		progress.value = newProgress

		if (newProgress < 100 && boost.value) {
			progressInterval = window.requestAnimationFrame(animate)
		} else if (newProgress >= 100) {
			isComplete.value = true
			progress.value = 100
		}
	}

	progressInterval = window.requestAnimationFrame(animate)
}

const stopBoost = () => {
	boost.value = false
	if (progressInterval) {
		window.cancelAnimationFrame(progressInterval)
		progressInterval = null
	}
	// Smooth transition back with CSS
	isComplete.value = false
	setTimeout(() => {
		progress.value = 0
	}, 10)
}

watch(skill, (newSkill, oldSkill) => {
	if (!newSkill) {
		// Skill cleared - slide out
		isVisible.value = false
		setTimeout(() => {
			displayedSkill.value = ''
		}, 300) // Wait for slide-out animation
	} else if (!displayedSkill.value) {
		// First skill - slide in immediately
		displayedSkill.value = newSkill
		setTimeout(() => {
			isVisible.value = true
		}, 50) // Delay to ensure DOM is ready and initial styles applied
	} else {
		// Skill changed - slide out, update, slide in
		isVisible.value = false
		setTimeout(() => {
			displayedSkill.value = newSkill
			setTimeout(() => {
				isVisible.value = true
			}, 50)
		}, 300) // Wait for slide-out animation
	}
})
</script>
<template>
	<div class="splash-screen gridBackground">
		<SkillTip />
		<SkillContainer
			v-if="displayedSkill"
			:key="displayedSkill"
			:skillKey="displayedSkill"
			:visible="isVisible"
		/>
		<div class="icon-container">
			<RotIcons :boost="boost" @skillChange="skill = $event" />
		</div>
		<button
			class="boost"
			@mousedown="startBoost"
			@mouseup="stopBoost"
			@mouseleave="stopBoost"
			@touchstart="startBoost"
			@touchend="stopBoost"
		>
			<svg class="progress-ring" viewBox="0 0 120 120">
				<circle class="progress-ring-bg" cx="60" cy="60" r="54" />
				<circle
					class="progress-ring-circle"
					cx="60"
					cy="60"
					r="54"
					:style="{
						strokeDashoffset: 339.292 - (339.292 * progress) / 100,
					}"
					:class="{ complete: isComplete }"
				/>
			</svg>
			<i class="fa-solid fa-rocket"></i>
		</button>
		<div class="headBorder">
			<div class="content">
				<span>
					<h1>Oliver Heffernan</h1>
					<h3>Software Engineer</h3>
				</span>
			</div>
		</div>
	</div>
</template>
<style scoped>
.splash-screen {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
}
.icon-container {
	position: absolute;
	top: 65%;
	left: 50%;
	transform: translateX(-50%);
	width: 75vw;
	height: 75vw;
	z-index: 50;
}

.headBorder {
	z-index: 100;
	position: absolute;
	top: 65%;
	left: 50%;
	transform: translateX(-50%);
	width: 75vw;
	height: 75vw;
	text-align: center;
	border-radius: 50%;
	/*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
	border: 1px solid var(--border);
	background-color: var(--bg);
}

.content {
	position: absolute;
	box-sizing: border-box;
	top: 0;
	left: 0;
	width: 100%;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 35vh;

	padding: 40px 0;
}

.content > * {
	margin: 0;
	padding: 0;
}

.boost {
	position: absolute;
	top: calc(65% - 37.5vw + 40px);
	left: calc(50% - 37.5vw + 40px);
	z-index: 101;
	color: var(--text);
	user-select: none;
	border: none;
	background: none;
	font-size: 1.5rem;
	cursor: pointer;
	width: 80px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
}

@media (min-width: 600px) {
	.boost {
		top: max(120px, calc(65% - 130px));
		left: max(40px, calc(50% - 450px + 40px));
	}
}

.boost i {
	position: relative;
	z-index: 2;
	transition: transform 0.3s ease;
}

.boost:hover {
	color: var(--text-hover);
}

.boost:hover i {
	transform: rotate(-45deg);
}

.boost:hover .progress-ring-bg {
	animation: none;
	opacity: 0.5;
}

.boost:active i {
	animation: rocket-launch 0.6s ease-in-out;
}

.progress-ring {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80px;
	height: 80px;
	z-index: 1;
}

.progress-ring-bg {
	fill: none;
	stroke: var(--border);
	stroke-width: 3;
	opacity: 0.3;
	animation: pulse-ring 2s ease-in-out infinite;
}

.progress-ring-circle {
	fill: none;
	stroke: var(--text);
	stroke-width: 4;
	stroke-linecap: round;
	stroke-dasharray: 339.292;
	stroke-dashoffset: 339.292;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
	transition:
		stroke 0.3s ease,
		stroke-dashoffset 0.3s ease-out;
}

.progress-ring-circle.complete {
	stroke: var(--active);
	stroke-dashoffset: 0;
}

@keyframes pulse-ring {
	0%,
	100% {
		opacity: 0.3;
		stroke-width: 3;
	}
	50% {
		opacity: 0.6;
		stroke-width: 4;
	}
}

@keyframes rocket-launch {
	0% {
		transform: rotate(-45deg) translateY(0);
	}
	50% {
		transform: rotate(-45deg) translateY(-3px);
	}
	100% {
		transform: rotate(-45deg) translateY(0);
	}
}
</style>
