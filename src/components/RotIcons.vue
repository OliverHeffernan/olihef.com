<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import gsap from 'gsap'
import Info from '@/classes/Info'
import RotIcon from './RotIcon.vue'

const props = defineProps<{
	boost: boolean
}>()

const emit = defineEmits<{
	(event: 'skillChange', skillKey: string): void
}>()

const angle: Ref<number> = ref<number>(0)
const speedState = { current: 0, target: 0.02 }
const topSpeed = 0.02
const boostSpeed = 0.15
let pause = false

function setPause(value: boolean, skillKey: string) {
	pause = value

	// Kill any existing speed tweens to prevent conflicts
	gsap.killTweensOf(speedState)

	if (value) {
		emit('skillChange', skillKey)
		// Smoothly decelerate to stop
		gsap.to(speedState, {
			current: 0,
			duration: 1.5,
			ease: 'power2.out',
		})
	} else {
		// Resume to current target speed
		gsap.to(speedState, {
			current: speedState.target,
			duration: 1,
			ease: 'power2.inOut',
		})
	}
}

// convert Info.skills to an array of values
const skillsArray = Array.from(Info.skills.values())
skillsArray.push(...skillsArray)

// Watch for boost changes
watch(
	() => props.boost,
	(newBoost) => {
		speedState.target = newBoost ? boostSpeed : topSpeed
		if (!pause) {
			// Kill any existing tweens before starting a new one
			gsap.killTweensOf(speedState)
			gsap.to(speedState, {
				current: speedState.target,
				duration: 1,
				ease: 'power2.inOut',
			})
		}
	},
)

// Start the animation loop with GSAP ticker
onMounted(() => {
	speedState.current = topSpeed

	gsap.ticker.add(() => {
		angle.value += speedState.current
	})
})
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
