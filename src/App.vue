<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

import 'lenis/dist/lenis.css'
import useLenis from '@/lenis/useLenis'

const lenis = useLenis()

const isDark = ref(false)

onMounted(() => {
	const savedTheme = localStorage.getItem('theme')
	if (savedTheme) {
		isDark.value = savedTheme === 'dark'
	}
	applyTheme()
})

watch(isDark, () => {
	applyTheme()
	localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
})

function applyTheme() {
	const root = document.documentElement
	if (isDark.value) {
		root.style.setProperty('--bg', 'rgb(20, 20, 20)')
		root.style.setProperty('--text', 'white')
		root.style.setProperty('--border', 'rgb(50, 50, 50)')
		root.style.setProperty('--sec-text', 'rgb(150, 150, 150)')
		root.style.setProperty('--text-hover', 'rgb(200, 200, 200)')
		root.style.setProperty('--active', 'rgb(255, 255, 255)')
	} else {
		root.style.setProperty('--bg', 'white')
		root.style.setProperty('--text', 'black')
		root.style.setProperty('--border', '#ddd')
		root.style.setProperty('--sec-text', 'rgb(200, 200, 200)')
		root.style.setProperty('--text-hover', 'rgb(150, 150, 150)')
		root.style.setProperty('--active', 'rgb(100, 100, 100)')
	}
}

function toggleTheme() {
	isDark.value = !isDark.value
}
</script>

<template>
	<button
		class="theme-toggle"
		@click="toggleTheme"
		:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
	>
		<i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
	</button>
	<RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap');

:root {
	--gap: 20px;
	--minor-gap: 10px;
	--border-radius: 10px;
	--major-border-radius: 20px;
	--yellow: #ffcc00;
	--accent: #41B883;

	--border: #ddd;
	--text: black;
	--sec-text: rgb(200, 200, 200);
	--text-hover: rgb(150, 150, 150);
	--active: rgb(100, 100, 100);
	--bg: white;

	--mono-font: 'Fira Code', monospace;

	/*
	--bg: rgb(20, 20, 20);
	--text: white;
	--border: rgb(50, 50, 50);
	--sec-text: rgb(150, 150, 150);
	--text-hover: rgb(200, 200, 200);
	--active: rgb(255, 255, 255);
	*/
}

body,
html {
	margin: 0;
	padding: 0;
	color: var(--text);
	overflow-x: hidden;
	font-family:
		'Segoe UI',
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		Roboto,
		'Helvetica Neue',
		Arial,
		sans-serif;
	background-color: var(--bg);
}

body {
	overflow-y: hidden;
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
	flex-wrap: wrap;
}

.theme-toggle {
	position: fixed;
	top: var(--minor-gap);
	right: var(--minor-gap);
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: 2px solid var(--border);
	background: var(--bg);
	color: var(--text);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	transition: all 0.3s ease;
	z-index: 1000;
}

.theme-toggle:hover {
	color: var(--text-hover);
	border-color: var(--text-hover);
	transform: scale(1.1);
}

.theme-toggle:active {
	transform: scale(0.95);
}

.boxHeader {
	box-sizing: border-box;
	padding: var(--minor-gap);
	border: 1px solid var(--border);
	background-color: var(--bg);
	border-radius: var(--border-radius);
}

.boxP {
	box-sizing: border-box;
	padding: var(--gap);
	margin: 0;
	border: 1px solid var(--border);
	border-radius: var(--border-radius);
	background-color: var(--bg);
}

.box {
	box-sizing: border-box;
	padding: var(--gap);
	margin: 0;
	border: 1px solid var(--border);
	border-radius: var(--border-radius);
}

hr {
	border: none;
	border-top: 1px solid var(--border);
	margin: var(--gap) 0;
}

</style>
