<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import Info from '@/classes/Info'
import RotIcon from './RotIcon.vue'
const emit = defineEmits<{
	(event: 'skillChange', skillKey: string): void
}>()

const topSpeed = 0.07
var speed = topSpeed
const acceleration = 0.001
const angle: Ref<number> = ref<number>(0)
let pause = false

function setPause(value: boolean, skillKey: string) {
	pause = value
	if (value) {
		emit('skillChange', skillKey)
	}
}

// convert Info.skills to an array of values
const skillsArray = Array.from(Info.skills.values())
skillsArray.push(...skillsArray)

setInterval(() => {
	if (pause && speed > 0) {
		speed -= acceleration
	} else if (!pause && speed < topSpeed) {
		speed += acceleration
	}
	angle.value += speed
}, 8)
</script>
<template>
	<div class="rotate" :style="{ transform: `rotate(${angle}deg)` }">
		<RotIcon
			v-for="(skill, index) in skillsArray"
			:key="index"
			:startAngle="index * (360 / skillsArray.length)"
			:icon="skill.icon"
			:offset="angle"
			@hoverEnter="setPause(true, skill.key)"
			@hoverLeave="setPause(false, skill.key)"
		/>
	</div>
</template>
<style scoped>
.rotate {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
