<template>
	<div class="cursor"></div>
</template>
<style scoped>
.cursor {
	position: fixed;
	top: 0;
	left: 0;
	width: 10px;
	height: 10px;
	border: 1px solid var(--sec-text);
	border-radius: 50%;
	background: none;
	z-index: 10000;
	pointer-events: none;
}
</style>
