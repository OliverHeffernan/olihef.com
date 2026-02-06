<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
	<RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Turret+Road:wght@200;300;400;500;700;800&display=swap');

:root {
	/*
	--border: #ddd;
	--text: black;
	--sec-text: rgb(200, 200, 200);
	--text-hover: rgb(150, 150, 150);
	--active: rgb(100, 100, 100);
	--bg: white;
	*/

	--bg: black;
	--text: white;
	--border: rgb(50, 50, 50);
	--sec-text: rgb(150, 150, 150);
	--text-hover: rgb(200, 200, 200);
	--active: rgb(255, 255, 255);
}

body, html {
	margin: 0;
	padding: 0;
	color: var(--text);
	overflow-x: hidden;
	font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, sans-serif;
}
.margins {
	width: min(800px, 90%);
	margin: 0 auto;
}

.flex-column {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.flex-row {
	display: flex;
	flex-direction: row;
	gap: 20px;
}
</style>
