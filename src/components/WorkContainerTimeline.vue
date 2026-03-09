<script setup lang="ts">
defineProps<{
	role: string
	place: string
	start: string
	end: string
}>();
</script>
<template>
	<div class="cont">
		<h2>{{role}}</h2>
		<h3>{{place}}</h3>
		<slot />
		<span id="circle"></span>
		<h4 id="time">{{start}} - {{end}}</h4>
	</div>
</template>
<style scoped>
.cont {
	position: relative;
	min-width: 500px;
	max-width: 600px;
	width: 50vw;
	height: auto;
	padding: var(--gap);
	border: 1px solid var(--border);
	border-radius: var(--border-radius);
	background-color: var(--bg);
	flex-shrink: 0; /* Prevent cards from shrinking */
	display: flex;
	flex-direction: column;
	gap: var(--minor-gap);
}

.cont h2 {
	margin: 0;
	padding: 0;
	font-size: 1.8rem;
}

.cont h3 {
	margin: 0;
	color: var(--accent);
	font-size: 1.2rem;
}

.cont:last-child {
	padding-bottom: var(--gap);
	margin-bottom: 0;
}

#circle {
	position: absolute;
	left: var(--minor-gap);
	top: var(--minor-gap);
	width: 12px;
	height: 12px;
	background-color: var(--accent);
	border-radius: 50%;
	border: 3px var(--bg) solid;
	box-shadow: 0 0 0 1px var(--border);
}

#time {
	position: absolute;
	top: var(--minor-gap);
	right: var(--gap);
	color: var(--sec-text);
	font-family: var(--mono-font);
	font-size: 0.9rem;
	margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
	.cont {
		min-width: 80vw;
		max-width: 85vw;
		width: 80vw;
	}

	.cont h2 {
		font-size: 1.4rem;
	}

	.cont h3 {
		font-size: 1rem;
	}

	#time {
		position: static;
		margin-top: var(--minor-gap);
	}
}
</style>
