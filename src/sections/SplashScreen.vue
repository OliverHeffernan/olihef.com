<script setup lang="ts">
import { ref, watch } from 'vue'
import GridBackground from '@/components/GridBackground.vue'
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

const closeSkill = () => {
	skill.value = ''
}

watch(skill, (newSkill) => {
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
	<div class="splash-screen">
		<GridBackground />
		<SkillTip />
		<SkillContainer
			v-if="displayedSkill"
			:key="displayedSkill"
			:skillKey="displayedSkill"
			:visible="isVisible"
			@close="closeSkill"
		/>
		<div class="orbit-stage">
			<div class="icon-container">
				<RotIcons :boost="boost" :active-skill="skill" @skillChange="skill = $event" />
			</div>
			<button
				class="boost"
				data-magnetic
				aria-label="Hold to boost the skill orbit"
				@mousedown="startBoost"
				@mouseup="stopBoost"
				@mouseleave="stopBoost"
				@touchstart.prevent="startBoost"
				@touchend.prevent="stopBoost"
				@touchcancel="stopBoost"
			>
				<svg class="progress-ring" viewBox="0 0 120 120" aria-hidden="true">
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
	</div>
</template>
<style scoped>
.splash-screen {
	--orbit-size: 75vw;

	position: relative;
	width: 100%;
	height: 100vh;
	height: 100svh;
	overflow: hidden;
}

.orbit-stage {
	position: absolute;
	top: 65%;
	left: 50%;
	transform: translateX(-50%);
	width: var(--orbit-size);
	height: var(--orbit-size);
}

.icon-container {
	position: absolute;
	inset: 0;
	z-index: 50;
}

.headBorder {
	z-index: 100;
	position: absolute;
	inset: 0;
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
	pointer-events: none;
	height: min(35vh, 100%);

	padding: clamp(24px, 5vh, 40px) 0;
}

.content > * {
	margin: 0;
	padding: 0;
}

.content h1 {
	font-size: clamp(2rem, 5vw, 3.5rem);
	line-height: 1.05;
	margin: 0;
}

.content h3 {
	font-size: clamp(1rem, 2vw, 1.35rem);
	margin: var(--minor-gap) 0 0;
}

.boost {
	position: absolute;
	top: max(-130px, calc(var(--orbit-size) * -0.5 + 40px));
	left: max(40px, calc(var(--orbit-size) * 0.5 - 410px));
	z-index: 101;
	color: var(--text);
	user-select: none;
	border: none;
	background: var(--bg);
	border-radius: 50%;
	font-size: 1.5rem;
	cursor: pointer;
	width: 80px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	touch-action: manipulation;
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

@media (min-width: 481px) and (max-width: 900px) {
	.boost {
		top: -220px;
		left: 20px;
	}
}

@media (max-width: 480px) {
	.splash-screen {
		--orbit-size: clamp(260px, 82vw, 330px);

		height: 100dvh;
		min-height: 500px;
	}

	.orbit-stage {
		top: auto;
		bottom: max(76px, env(safe-area-inset-bottom));
	}

	.content {
		height: 100%;
		justify-content: center;
		padding: var(--gap) 10px;
	}

	.content h1 {
		font-size: clamp(1.45rem, 7.2vw, 2rem);
	}

	.content h3 {
		font-size: clamp(0.85rem, 4vw, 1rem);
	}

	.boost {
		top: -120px;
		left: -8px;
		width: 60px;
		height: 60px;
		font-size: 1.1rem;
	}

	.progress-ring {
		width: 60px;
		height: 60px;
	}
}

@media (max-height: 700px) and (max-width: 600px) {
	.splash-screen {
		--orbit-size: clamp(235px, 76vw, 270px);
	}

	.orbit-stage {
		bottom: max(44px, env(safe-area-inset-bottom));
	}

	.boost {
		top: calc(var(--orbit-size) * -0.5 - 20px);
	}
}

@media (orientation: landscape) and (max-height: 500px) {
	.splash-screen {
		--orbit-size: clamp(180px, 48vh, 230px);
		min-height: 320px;
	}

	.orbit-stage {
		top: auto;
		bottom: 40px;
	}

	.boost {
		top: -100px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.boost i,
	.progress-ring-circle {
		transition: none;
	}

	.progress-ring-bg {
		animation: none;
	}
}
</style>
