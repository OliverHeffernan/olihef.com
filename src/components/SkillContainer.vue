<template>
	<div class="skill-container" :class="{ visible: visible }" v-if="skill">
		<img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}.svg`" />
		<h2>{{ skill.key }}</h2>
	</div>
</template>
<script setup lang="ts">
import Info from '@/classes/Info'
const props = defineProps<{
	skillKey: string
	visible: boolean
}>()

const skill = Info.skills.get(props.skillKey)
const projects = Info.projects.filter((project) => project.skills.includes(props.skillKey))
</script>
<style scoped>
.skill-container {
	position: fixed;
	box-sizing: border-box;
	padding: 20px;
	top: -100%;
	width: min(calc(100% - 20px), 500px);
	left: 50%;
	transform: translateX(-50%);
	height: 40%;
	background-color: rgb(240, 240, 240);
	transition: top 0.3s ease-out;

	border-radius: 20px;
}

.skill-container.visible {
	top: 10px;
}

.skill-container img {
	width: 100px;
	height: 100px;
}
</style>
