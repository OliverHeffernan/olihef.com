<template>
	<RouterLink
		:to="route"
		class="back-button"
	>
		<i class="fa-solid fa-arrow-left"></i>
		back to {{label}}
	</RouterLink>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
defineProps<{
	label: string
	route: string
}>();
</script>
<style scoped>
.back-button {
	border: 1px solid var(--border);
	border-radius: 5px;
	background-color: var(--bg);
	padding: var(--minor-gap);
	text-decoration: none;
	color: var(--text);
	transition: background-color 0.2s;
}
.back-button:hover {
	background-color: var(--border);
}
</style>
