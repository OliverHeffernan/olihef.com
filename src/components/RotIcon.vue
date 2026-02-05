<script setup lang="ts">
const props = defineProps<{
	startAngle: number
	offset: number
	icon: string
}>()

const emit = defineEmits(['hoverEnter', 'hoverLeave'])
</script>
<template>
	<div class="parent">
		<div class="rotating" :style="{ transform: `rotate(${props.startAngle}deg)` }">
			<div class="icon" @mouseenter="emit('hoverEnter')" @mouseleave="emit('hoverLeave')">
				<img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}.svg`" />
			</div>
		</div>
	</div>
</template>
<style scoped>
.parent {
	height: 100%;
	width: 100%;
	position: absolute;
	z-index: -1;
	pointer-events: none;
}
.rotating {
	height: 100%;
	width: 100%;
	position: relative;
	pointer-events: none;
}

.icon {
	position: absolute;
	bottom: calc(100% + 50px);
	left: 50%;
	transform: translateX(-50%);
	font-size: 30px;
	width: 70px;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: auto;
}

.icon img {
	width: 50px;
	height: 50px;
	padding: 10px;
	border-radius: 10px;
	display: block;
	pointer-events: none;
}

.icon:hover img {
	background-color: rgb(240, 240, 240);
}
</style>
