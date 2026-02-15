<script setup lang="ts">
defineProps<{
	title: string
	value: string
}>()
</script>
<template>
	<div class="stat-card">
		<p class="title">{{ title }}</p>
		<p class="value">{{ value }}</p>
	</div>
</template>
<style scoped>

.stat-card {
	position: relative;
	padding: 20px;
	border: 1px solid var(--border);
	background-color: var(--bg);
	border-radius: var(--border-radius);
}

.title {
	position: absolute;
	margin: 0;
	padding: 5px;
	top: -15px;
	left: var(--border-radius);
	background-color: var(--bg);
	color: var(--sec-text);
}

.value {
	font-size: 2rem;
}
</style>
