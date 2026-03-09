<script setup lang="ts">
defineProps<{
	role: string
	place: string
	start: string
	end: string
}>()
</script>
<template>
	<div class="timeline-item">
		<div class="content-card">
			<h2>{{ role }}</h2>
			<h3>{{ place }}</h3>
			<p class="description"><slot /></p>
		</div>
		<div class="timeline-connector">
			<div class="vertical-line"></div>
			<div class="timeline-dot"></div>
		</div>
		<div class="timeline-date">
			<span>{{ start }} - {{ end }}</span>
		</div>
	</div>
</template>
<style scoped>
.timeline-item {
	/* ADJUST THIS to position horizontal line: offset from center to line position */
	--timeline-line-offset: 180px; /* Distance below center where horizontal line appears */

	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center; /* Center vertically */
	flex-shrink: 0;
	min-width: 700px;
	max-width: 600px;
	width: 50vw;
	height: 100%;
}

.content-card {
	background-color: var(--bg);
	border: 1px solid var(--border);
	border-radius: var(--border-radius);
	padding: var(--gap);
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--minor-gap);
	position: relative;
	height: 180px; /* ← FIXED HEIGHT: All cards same height */
	overflow: hidden; /* Hide content that doesn't fit */
}

.content-card h2 {
	margin: 0;
	padding: 0;
	font-size: 1.5rem;
	color: var(--text);
}

.content-card h3 {
	margin: 0;
	color: var(--accent);
	font-size: 1rem;
}

.description {
	margin: 0;
	color: var(--text);
	line-height: 1.5;
	font-size: 0.95rem;
	overflow: hidden;
	text-overflow: ellipsis;
}

.timeline-connector {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0;
	flex-shrink: 0;
	height: var(--timeline-line-offset); /* Height matches line offset for perfect alignment */
}

.vertical-line {
	width: 2px;
	height: 100%;
	background-color: var(--border);
}

.timeline-dot {
	width: 16px;
	height: 16px;
	background-color: var(--accent);
	border-radius: 50%;
	border: 3px solid var(--bg);
	box-shadow: 0 0 0 2px var(--border);
	z-index: 2;
	position: absolute;
	bottom: 0; /* Position at bottom of connector */
	left: 50%;
	transform: translate(-50%, 50%); /* Center horizontally and push down by half to sit on line */
}

.timeline-date {
	text-align: center;
	font-family: var(--mono-font);
	font-size: 0.9rem;
	color: var(--sec-text);
	font-weight: 500;
	margin-top: 20px;
	white-space: nowrap;
	flex-shrink: 0;
}

/* Add horizontal connecting line between items using pseudo-element */
.timeline-item::after {
	content: '';
	position: absolute;
	top: calc(50% + var(--timeline-line-offset)); /* FORMULA: center + offset = line position */
	left: 50%;
	width: 100vw;
	height: 2px;
	background-color: var(--border);
	z-index: 1;
	pointer-events: none;
}

/* Remove line after last item */
.timeline-item:last-child::after {
	display: none;
}

/* Responsive */
@media (max-width: 768px) {
	.timeline-item {
		--timeline-line-offset: 25px; /* ADJUST THIS for mobile positioning */
		min-width: 80vw;
		max-width: 85vw;
		width: 80vw;
	}

	.content-card {
		height: 140px; /* ← FIXED HEIGHT for mobile: All cards same height */
	}

	.content-card h2 {
		font-size: 1.2rem;
	}

	.content-card h3 {
		font-size: 0.9rem;
	}

	.timeline-date {
		font-size: 0.8rem;
	}
}
</style>
