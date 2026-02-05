<script setup lang="ts">
import { ref } from 'vue'
import Info from '@/classes/Info';
import RotIcon from './RotIcon.vue';

const topSpeed = 0.07
var speed = topSpeed
const acceleration = 0.001
const angle = ref(0)
let pause = false

function setPause(value: boolean) {
	pause = value
}

setInterval(() => {
	if (pause && speed > 0) {
		speed -= acceleration
	} else if (!pause && speed < topSpeed) {
		speed += acceleration
	}
	angle.value += speed
	console.log(angle.value)
}, 8)

</script>
<template>
	<div class="rotate" :style="{ transform: `rotate(${angle}deg)` }">
		<RotIcon
			v-for="(skill, index) in Info.skills.values()" :key="index"
			:startAngle="index * (360 / (Info.skillCount))"
			:icon="skill.icon"
			:offset="angle"
			@hoverEnter="setPause(true)"
			@hoverLeave="setPause(false)"
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
