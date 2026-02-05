<script setup lang="ts">
import RotIcons from '@/components/RotIcons.vue'
</script>
<template>
	<div class="splash-screen">
		<div class="icon-container">
			<RotIcons />
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
