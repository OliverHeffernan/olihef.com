<script setup lang="ts">
import { ref } from 'vue';
import WorkContainer from '@/components/WorkContainerTimeline.vue';
import { useHorizontalScrollJack } from '@/composables/useHorizontalScrollJack';

const containerRef = ref<HTMLElement | null>(null);
const scrollerRef = ref<HTMLElement | null>(null);

// Initialize horizontal scroll effect
useHorizontalScrollJack(containerRef, scrollerRef, {
	scrub: 1,
	scrollMultiplier: 1.5,
	markers: false // Set to true for debugging
});
</script>
<template>
	<div class="section-wrapper">
		<div class="margins">
			<h1 class="boxHeader">Work Experience</h1>
		</div>
		<div ref="containerRef" class="horizontal-container">
			<div ref="scrollerRef" class="horizontal-scroller">
				<WorkContainer
					role="COMP102 Tutor"
					place="Victoria University of Wellington"
					start="Feb 2026"
					end="Present"
				>
					Tutoring COMP102 at Victoria University of
					Wellington as a second year student. This
					involves running tutorial sessions, as well as
					marking assignments.
				</WorkContainer>
				<WorkContainer
					role="Bachelor of Engineering with Honours, majoring in Software Engineering"
					place="Victoria University of Wellington"
					start="2025"
					end="Present"
				>
					<ul>
						<li>A+ average</li>
						<li>Victoria University of Wellington School-Leaver Tangiwai Excellence Scholarship 2025</li>
						<li>Dean's List for Faculty of Science and Engineering 2025 (Top students in the faculty)</li>
					</ul>
				</WorkContainer>
				<WorkContainer
					role="NCEA levels 1-3 with Excellence
					Endorsed"
					place="St Patrick's College Silverstream"
					start="2020"
					end="2024"
				>
					<ul>
						<li>2024 Dux of the school</li>
						<li>2023 Year 12 Gold Scholar (number 1 academic in year group)</li>
					</ul>
				</WorkContainer>
			</div>
		</div>
	</div>
</template>
<style scoped>
.section-wrapper {
	position: relative;
	background-color: var(--bg);
}

.margins {
	padding: var(--major-gap) 0;
}

.horizontal-container {
	position: relative;
	width: 100%;
	height: 80vh; /* Visual height of the pinned section */
	overflow: hidden;
	display: flex;
	align-items: center;
	/* Safari-specific fixes */
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}

.horizontal-scroller {
	display: flex;
	flex-direction: row;
	align-items: stretch; /* Make all children same height */
	gap: var(--massive-gap);
	/* Calculate left padding to align with .margins class */
	/* .margins is min(800px, 90%), centered with margin: 0 auto */
	/* So left offset = max((100vw - 800px) / 2, 5vw) */
	padding-left: max(calc((100vw - 800px) / 2), 5vw);
	padding-right: 5vw;
	will-change: transform;
	height: 100%; /* Take full height of container */
	/* Safari hardware acceleration */
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.horizontal-container {
		height: 70vh;
	}

	.horizontal-scroller {
		gap: var(--gap);
		padding: 0 2vw;
	}
}
</style>
