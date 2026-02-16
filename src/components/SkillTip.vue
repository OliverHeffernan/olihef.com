<template>
	<div class="tip">
		<div class="content">
			<p>Hover over the icons to see my skills!</p>
		</div>
	</div>
</template>
<style scoped>
@keyframes slideIn {
0% {
	top: -100%;
}
50% {
	top: -100%;
}
100% {
	top: 10px;
}
}
.tip {
	position: absolute;
	box-sizing: border-box;
	color: var(--sec-text);
	background-color: var(--bg);
	border: 1.5px dashed var(--border);
	border-radius: 20px;
	padding: 20px;

	width: min(calc(100% - 20px), 500px);
	height: 290px;

	left: 50%;
	transform: translateX(-50%);

	animation: slideIn 1.2s ease;
	animation-fill-mode: forwards;
}

.tip .content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
}

.tip p {
	width: 100%;
	text-align: center;
}
</style>
