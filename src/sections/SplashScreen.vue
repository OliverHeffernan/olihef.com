<template>
	<div class="splash">
		<h1 class="big">
			<span class="part1">oliver </span>
			<span class="part2">heffernan</span>
		</h1>
		<div class="scroll-indicator">
			scroll down
		</div>
		<h3>Full-Stack Software Engineer</h3>
	</div>
</template>
<style scoped>
.scroll-indicator {
	height: 500px;
	position: absolute;
	top: 50%;
	left: 25%;
	transform: translateY(-50%);
	padding-left: 10px;
	font-family: 'Turret Road', sans-serif;
	color: rgb(200,200,200);

	border-left: 1px solid rgb(200, 200, 200);

	animation-name: fade-out;
	animation-timeline: scroll(root);
	animation-duration: 1svh;
	animation-fill-mode: forwards;
}
@keyframes fade-out {
0% {
	opacity: 1;
}
70% {
	opacity: 0;
}
100% {
	opacity: 0;
}
}
.splash {
	width: 100%;
	height: 200vh;
	margin: 0;
	padding: 0;
	position: relative;
}
.big {
	font-family: 'Turret Road', sans-serif;
	font-weight: 800;
	font-size: 33vw;
	text-align: center;
	margin: 0;

	display: block;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	white-space: nowrap;
	text-wrap: nowrap;

	animation-name: expand-big;
	animation-timeline: scroll(root);
	animation-duration: 1svh;
	animation-fill-mode: forwards;
}

h3 {
	font-family: 'Turret Road', sans-serif;
	width: 100%;
	text-align: center;
	position: absolute;
	bottom: 38vh;
}

.part1 {
	/* .big font-size times 1.2 */
	width: 39.6vw;
	display: inline-block;
	overflow: hidden;
}

.part2 {
	/* .big font-size times 1.7 */
	width: 56.1vw;
	display: inline-block;
	overflow: hidden;
}


@keyframes expand-big {
from {
	font-size: 33vw;
}
to {
	font-size: 10vw;
}
}
</style>
