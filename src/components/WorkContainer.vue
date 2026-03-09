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
	padding: var(--gap);
	border-left: 1px solid var(--border);
	position: relative;
}

.cont h2 {
	margin-top: 0;
	padding-top: 0;
}

.cont h3 {
	color: var(--accent);
}

.cont:last-child {
	padding-bottom: 0;
	margin-bottom: 0;
}

#circle {
	position: absolute;
	left: 0;
	top: 0;
	transform: translateX(-50%);
	width: 10px;
	height: 10px;
	background-color: var(--accent);
	border-radius: 50%;
	border: 5px var(--bg) solid;
}

#time {
	position: absolute;
	top: var(--minor-gap);
	right: 0;
	color: var(--border);
}
</style>
