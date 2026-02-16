<script setup lang="ts">
const props = defineProps<{
	startAngle: number
	offset: number
	icon: string
}>()

const emit = defineEmits<{
	(event: 'hoverEnter'): void;
	(event: 'hoverLeave'): void;
}>()

</script>
<template>
	<div class="parent">
		<div class="rotating" :style="{ transform: `rotate(${props.startAngle}deg)` }">
			<div
				class="icon data-magnetic"
				@click="emit('hoverEnter')"
				@mouseenter="emit('hoverEnter')"
				@mouseleave="emit('hoverLeave')"
			>
				<i
					v-if="icon === 'rust/rust-original'"
					class="devicon-rust-original display"
				></i>
				<img
					v-else
					class="display"
					:src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}.svg`"
				/>
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

.icon .display {
	width: 50px;
	height: 50px;
	padding: 10px;
	border-radius: 10px;
	display: block;
	pointer-events: none;

	border: 1px solid var(--border);
	background-color: var(--bg);
	transition: background-color 0.3s ease, scale 0.3s ease;
	font-size: 50px;
}


.icon:hover .display {
	background-color: var(--border);
	scale: 1.1;
}
</style>
