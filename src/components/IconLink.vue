<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{
	icon: string
	route: string
	external?: boolean
}>()
</script>
<template>
	<RouterLink v-if="!external" :to="route" class="iconLink">
		<i class= "icon" :class="icon"></i>
		<span class="label"><slot></slot></span>
	</RouterLink>
	<a
		v-else
		:href="route"
		class="iconLink"
		target="_blank"
		rel="noopener noreferrer"
	>
		<i class= "icon" :class="icon"></i>
		<span class="label"><slot></slot></span>
		<i class="fa-solid fa-arrow-up-right-from-square exIcon"></i>
	</a>
</template>
<style scoped>
.iconLink {
	display: flex;
	text-decoration: none;
	color: var(--text-color);
	padding: var(--border-radius);
	border: 1px solid var(--border);
	border-radius: var(--border-radius);

	transition: background-color 0.2s ease;
	background-color: var(--bg);
}

.iconLink .icon {
	font-size: 24px;
	color: var(--text-color);
}

.iconLink .label {
	margin-left: 8px;
	margin-top: 2px;
	white-space: nowrap;
}

.exIcon {
	margin-left: var(--border-radius);
	color: var(--border);
	transition: color 0.2s ease;
}

.iconLink:hover .exIcon {
	color: var(--text-color);
}

.iconLink:hover {
	background-color: var(--border);
}


</style>
