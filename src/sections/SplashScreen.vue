<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import RotIcons from '@/components/RotIcons.vue'
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
		}, 10) // Small delay to ensure DOM is ready
	} else {
		// Skill changed - slide out, update, slide in
		isVisible.value = false
		setTimeout(() => {
			displayedSkill.value = newSkill
			setTimeout(() => {
				isVisible.value = true
			}, 10)
		}, 300) // Wait for slide-out animation
	}
})
</script>
<template>
	<div class="splash-screen">
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
			</div>
		</div>
	</div>
</template>
<style scoped>
.icon-container {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%);
	width: 100vw;
	height: 100vw;
	z-index: 50;
}

.headBorder {
	z-index: 100;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	top: 50%;
	left: 50%;
	transform: translateX(-50%);
	width: 100vw;
	height: 100vw;
	text-align: center;
	border-radius: 50% 50% 0 0;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	background-color: white;
}

.content {
	position: relative;
	z-index: 1;
}
</style>
