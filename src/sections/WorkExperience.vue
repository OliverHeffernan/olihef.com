<script setup lang="ts">
import { ref } from 'vue'
import WorkContainer from '@/components/WorkContainerTimeline.vue'
import { useHorizontalScrollJack } from '@/composables/useHorizontalScrollJack'
import { useAnimatedGrid } from '@/composables/useAnimatedGrid'

const containerRef = ref<HTMLElement | null>(null)
const scrollerRef = ref<HTMLElement | null>(null)
const sectionWrapperRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

// Initialize horizontal scroll effect
useHorizontalScrollJack(containerRef, scrollerRef, {
	scrub: 1.5, // Smoother transitions for Safari
	scrollMultiplier: 1.5,
	markers: false, // Set to true for debugging
})

// Initialize animated grid (no hover effects, stationary background)
useAnimatedGrid(sectionWrapperRef, gridRef, {
	enableHover: false,
	targetOpacity: 0.2,
	scrollStart: 'top 90%',
	scrollEnd: 'top 30%',
	scrubValue: 1,
	stationary: true,
})
</script>
<template>
	<div ref="sectionWrapperRef" class="section-wrapper">
		<div ref="gridRef" class="animated-grid"></div>
		<div class="margins">
			<!--<h1 class="boxHeader">Work Experience</h1>-->
		</div>
		<div ref="containerRef" class="horizontal-container">
			<div ref="scrollerRef" class="horizontal-scroller">
				<WorkContainer
					role="Oliver Heffernan"
					place="Wellington, New Zealand"
					start=""
					end=""
				>
					Aspiring Software Engineer. Keep scrolling for an overview of my education and
					work experience.
				</WorkContainer>
				<WorkContainer
					role="COMP102 Tutor"
					place="Victoria University of Wellington"
					start="Feb 2026"
					end="Present"
				>
					Tutoring COMP102 at Victoria University of Wellington as a second year student.
					This involves running tutorial sessions, as well as marking assignments.
				</WorkContainer>
				<WorkContainer
					role="Bachelor of Engineering with Honours, majoring in Software Engineering"
					place="Victoria University of Wellington"
					start="2025"
					end="Present"
				>
					<ul>
						<li>A+ average</li>
						<li>
							Victoria University of Wellington School-Leaver Tangiwai Excellence
							Scholarship 2025
						</li>
						<li>
							Dean's List for Faculty of Science and Engineering 2025 (Top students in
							the faculty)
						</li>
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
	/* Add padding for smoother pin/unpin transitions */
	padding: calc(var(--major-gap) * 2) 0;
	overflow: hidden;
}

.animated-grid {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	--grid-color: var(--border);
	background-image:
		linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
		linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
	background-size: 50px 50px;
	background-position: center;
	/* background-attachment will be set to 'fixed' by composable when stationary: true */
	opacity: 0;
	pointer-events: none;
	z-index: 0;
}

.margins {
	padding: var(--major-gap) 0;
	position: relative;
	z-index: 1;
}

.horizontal-container {
	position: relative;
	width: 100%;
	height: 80vh; /* Visual height of the pinned section */
	overflow: hidden;
	display: flex;
	align-items: center;
	z-index: 1;
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
