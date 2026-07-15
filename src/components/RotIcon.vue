<script setup lang="ts">
const props = defineProps<{
	startAngle: number
	offset: number
	icon: string
	label: string
}>()

const emit = defineEmits<{
	(event: 'hoverEnter'): void
	(event: 'hoverLeave'): void
	(event: 'select', pointerEvent: MouseEvent): void
}>()
</script>
<template>
	<div class="parent">
		<div class="rotating" :style="{ transform: `rotate(${props.startAngle}deg)` }">
			<button
				type="button"
				class="icon data-magnetic"
				:aria-label="`Show ${label} skill details`"
				@click="emit('select', $event)"
				@mouseenter="emit('hoverEnter')"
				@mouseleave="emit('hoverLeave')"
			>
				<i v-if="icon === 'rust/rust-original'" class="devicon-rust-original display"></i>
				<img
					v-else
					class="display"
					:src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}.svg`"
				/>
			</button>
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
	bottom: calc(100% + var(--orbit-icon-gap, 50px));
	left: 50%;
	transform: translateX(-50%);
	font-size: 30px;
	width: 70px;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: auto;
	padding: 0;
	border: 0;
	background: transparent;
	color: var(--text);
	cursor: pointer;
}

.icon .display {
	width: 50px;
	height: 50px;
	padding: var(--minor-gap);
	border-radius: var(--border-radius);
	display: block;
	pointer-events: none;

	border: 1px solid var(--border);
	background-color: var(--bg);
	transition:
		background-color 0.3s ease,
		scale 0.3s ease;
	font-size: 50px;
}

.icon:hover .display {
	background-color: var(--border);
	scale: 1.1;
}

@media (max-width: 480px), (hover: none), (pointer: coarse) {
	.icon {
		bottom: calc(100% + var(--orbit-icon-gap, 18px));
		width: 56px;
		height: 56px;
	}

	.icon .display {
		box-sizing: border-box;
		width: 44px;
		height: 44px;
		padding: 7px;
		font-size: 38px;
	}
}

@media (max-height: 700px) and (max-width: 600px) {
	.icon {
		bottom: calc(100% + 12px);
		width: 52px;
		height: 52px;
	}

	.icon .display {
		width: 40px;
		height: 40px;
		padding: 6px;
		font-size: 34px;
	}
}
</style>
