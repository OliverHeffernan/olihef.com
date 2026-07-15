<template>
	<div class="tip">
		<div class="content">
			<p class="mouse-copy">Hover over the icons to see my skills!</p>
			<p class="touch-copy">Tap an icon to explore my skills</p>
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
		top: var(--minor-gap);
	}
}
.tip {
	position: absolute;
	box-sizing: border-box;
	color: var(--sec-text);
	background-color: var(--bg);
	border: 1.5px dashed var(--border);
	border-radius: var(--major-border-radius);
	padding: var(--gap);

	width: min(calc(100% - var(--minor-gap) * 2), 500px);
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

.touch-copy {
	display: none;
}

@media (hover: none), (pointer: coarse) {
	.tip {
		top: calc(env(safe-area-inset-top) + var(--minor-gap));
		left: var(--minor-gap);
		right: calc(env(safe-area-inset-right) + 74px);
		width: auto;
		height: auto;
		min-height: 48px;
		padding: 10px 12px;
		transform: none;
		animation: mobile-slide-in 600ms ease both;
	}

	.tip p {
		margin: 0;
		font-size: 0.82rem;
		line-height: 1.3;
	}

	.mouse-copy {
		display: none;
	}

	.touch-copy {
		display: block;
	}
}

@keyframes mobile-slide-in {
	from {
		opacity: 0;
		transform: translateY(-16px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (prefers-reduced-motion: reduce) {
	.tip {
		animation: none;
		top: var(--minor-gap);
	}
}

@media (prefers-reduced-motion: reduce) and (hover: none),
	(prefers-reduced-motion: reduce) and (pointer: coarse) {
	.tip {
		top: calc(env(safe-area-inset-top) + var(--minor-gap));
	}
}
</style>
