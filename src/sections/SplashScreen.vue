<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import RotIcons from '@/components/RotIcons.vue'
import SkillTip from '@/components/SkillTip.vue'
import SkillContainer from '@/components/SkillContainer.vue'

const skill: Ref<string> = ref<string>('')
const displayedSkill: Ref<string> = ref<string>('')
const isVisible: Ref<boolean> = ref<boolean>(false)

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
	<div class="splash-screen">
		<SkillTip />
		<SkillContainer
			v-if="displayedSkill"
			:key="displayedSkill"
			:skillKey="displayedSkill"
			:visible="isVisible"
		/>
		<div class="icon-container">
			<RotIcons @skillChange="skill = $event" />
		</div>
		<div class="headBorder">
			<div class="content">
				<h1>Oliver Heffernan</h1>
				<h3>Software Engineer</h3>
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
	background-color: var(--bg);
	background-position: 0 calc(100vh + 1px);
	background-image:
		linear-gradient(to right, var(--border) 1px, transparent 1px),
		linear-gradient(to bottom, var(--border) 1px, transparent 1px);
	background-size: 40px 40px;
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
	top: 10%;
	left: 50%;
	transform: translateX(-50%);
}
</style>
