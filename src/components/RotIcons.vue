<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import gsap from 'gsap'
import Info from '@/classes/Info'
import RotIcon from './RotIcon.vue'

const props = defineProps<{
	boost: boolean
	activeSkill: string
}>()

const emit = defineEmits<{
	(event: 'skillChange', skillKey: string): void
}>()

const angle: Ref<number> = ref<number>(0)
const speedState = { current: 0, target: 0.02 }
const topSpeed = 0.02
const boostSpeed = 0.15
let pause = false
const canHover = ref(false)
const reduceMotion = ref(false)

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

function showHoveredSkill(skillKey: string) {
	if (!canHover.value) return
	setPause(true, skillKey)
}

function selectSkill(skillKey: string, event: MouseEvent) {
	// Fine pointers already select on hover; detail === 0 preserves keyboard activation.
	if (canHover.value && event.detail > 0) return

	if (props.activeSkill === skillKey) {
		setPause(false, '')
		emit('skillChange', '')
		return
	}

	setPause(true, skillKey)
}

// convert Info.skills to an array of values
const skillsArray = Array.from(Info.skills.values())
skillsArray.push(...skillsArray)

// Watch for boost changes
watch(
	() => props.boost,
	(newBoost) => {
		if (reduceMotion.value) return
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

watch(
	() => props.activeSkill,
	(activeSkill) => {
		if (!activeSkill && pause) setPause(false, '')
	},
)

const updateAngle = () => {
	if (!reduceMotion.value) angle.value += speedState.current
}

// Start the animation loop with GSAP ticker
onMounted(() => {
	canHover.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
	reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	speedState.current = reduceMotion.value ? 0 : topSpeed
	gsap.ticker.add(updateAngle)
})

onUnmounted(() => {
	gsap.ticker.remove(updateAngle)
	gsap.killTweensOf(speedState)
})
</script>
<template>
	<div class="rotate" :style="{ transform: `rotate(${angle}deg)` }">
		<RotIcon
			v-for="(skill, index) in skillsArray"
			:key="index"
			:startAngle="index * (360 / skillsArray.length)"
			:icon="skill.icon"
			:label="skill.name"
			:offset="angle"
			@hoverEnter="showHoveredSkill(skill.key)"
			@hoverLeave="setPause(false, skill.key)"
			@select="selectSkill(skill.key, $event)"
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
