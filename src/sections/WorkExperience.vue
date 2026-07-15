<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import WorkContainer from '@/components/WorkContainerTimeline.vue'
import { useHorizontalScrollJack } from '@/composables/useHorizontalScrollJack'
import { useAnimatedGrid } from '@/composables/useAnimatedGrid'

const containerRef = ref<HTMLElement | null>(null)
const scrollerRef = ref<HTMLElement | null>(null)
const sectionWrapperRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const timelineProgress = ref(0)
const showNudge = ref(false)
const totalTimelineItems = 4
let hasPlayedNudge = false
let nudgeTimeout: number | undefined

const currentTimelineItem = computed(() =>
	Math.min(totalTimelineItems, Math.floor(timelineProgress.value * totalTimelineItems) + 1),
)
const progressPercentage = computed(() => Math.round(timelineProgress.value * 100))
const hasStartedScrolling = computed(() => timelineProgress.value > 0.035)

function playTimelineNudge() {
	if (hasPlayedNudge) return

	hasPlayedNudge = true
	showNudge.value = true
	nudgeTimeout = window.setTimeout(() => {
		showNudge.value = false
	}, 900)
}

onUnmounted(() => {
	if (nudgeTimeout !== undefined) window.clearTimeout(nudgeTimeout)
})

// Initialize horizontal scroll effect
useHorizontalScrollJack(containerRef, scrollerRef, {
	scrub: true,
	scrollMultiplier: () => (window.innerWidth < 800 ? 0.8 : 0.9),
	horizontalDistanceMultiplier: () => (window.innerWidth < 800 ? 0.27 : 0.3),
	markers: false, // Set to true for debugging
	onProgress: (progress) => {
		timelineProgress.value = progress
	},
	onEnter: playTimelineNudge,
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
		<div
			ref="containerRef"
			class="horizontal-container"
			:class="{ 'hint-active': showNudge }"
		>
			<div class="timeline-navigation">
				<p
					class="timeline-guide"
					:class="{ 'is-hidden': hasStartedScrolling }"
					:aria-hidden="hasStartedScrolling"
				>
					<span>Keep scrolling</span>
					<span class="direction" aria-hidden="true">↓ to move through my timeline →</span>
				</p>
				<div class="timeline-progress">
					<span class="timeline-count">{{ currentTimelineItem }} of {{ totalTimelineItems }}</span>
					<div
						class="progress-track"
						role="progressbar"
						aria-label="Timeline progress"
						:aria-valuenow="progressPercentage"
						aria-valuemin="0"
						aria-valuemax="100"
					>
						<span
							class="progress-fill"
							:style="{ transform: `scaleX(${timelineProgress})` }"
						></span>
					</div>
				</div>
			</div>
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
	--timeline-card-height: 280px;

	position: relative;
	width: 100%;
	height: 80vh; /* Visual height of the pinned section */
	overflow: hidden;
	display: flex;
	align-items: center;
	z-index: 1;
}

.timeline-navigation {
	position: absolute;
	top: var(--gap);
	left: max(calc((100vw - 800px) / 2), 5vw);
	right: 5vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--gap);
	z-index: 3;
	pointer-events: none;
}

.timeline-guide {
	display: flex;
	align-items: center;
	gap: var(--minor-gap);
	margin: 0;
	padding: 8px 12px;
	border: 1px solid var(--border);
	border-radius: 999px;
	background: var(--bg);
	/*font-family: var(--mono-font);*/
	font-size: 1.0rem;
	color: var(--text);
	transition:
		opacity 250ms ease,
		transform 250ms ease;
}

.timeline-guide.is-hidden {
	opacity: 0;
	transform: translateY(-8px);
}

.direction {
	color: var(--accent);
}

.timeline-progress {
	display: flex;
	align-items: center;
	gap: var(--minor-gap);
	margin-left: auto;
}

.timeline-count {
	font-family: var(--mono-font);
	font-size: 0.8rem;
	color: var(--sec-text);
	white-space: nowrap;
}

.progress-track {
	width: clamp(90px, 12vw, 160px);
	height: 3px;
	overflow: hidden;
	background: var(--border);
	border-radius: 999px;
}

.progress-fill {
	display: block;
	width: 100%;
	height: 100%;
	background: var(--accent);
	transform: scaleX(0);
	transform-origin: left center;
}

.hint-active :deep(.timeline-item:first-child) {
	animation: timeline-nudge 800ms ease-in-out;
}

@keyframes timeline-nudge {
	0%,
	100% {
		transform: translateX(0);
	}
	45% {
		transform: translateX(28px);
	}
}

.horizontal-scroller {
	--timeline-item-gap: var(--massive-gap);
	--timeline-end-padding: 5vw;

	display: flex;
	flex-direction: row;
	align-items: stretch; /* Make all children same height */
	gap: var(--timeline-item-gap);
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
@media (max-width: 784px) {
	.horizontal-container {
		--timeline-card-height: 280px;

		height: max(70svh, calc(var(--timeline-card-height) + 100px));
	}

	.horizontal-scroller {
		--timeline-item-gap: var(--gap);
		--timeline-end-padding: 2vw;

		padding: 0 2vw;
	}

	.timeline-navigation {
		left: 5vw;
		right: 5vw;
		align-items: flex-end;
	}

	.timeline-guide {
		flex-direction: column;
		align-items: flex-start;
		gap: 2px;
		font-size: 0.72rem;
	}

	.progress-track {
		width: 80px;
	}
}

@media (max-width: 480px) {
	.horizontal-container {
		--timeline-card-height: clamp(370px, calc(950px - 155vw), 460px);

		height: max(70svh, calc(var(--timeline-card-height) + 100px));
	}
}

@media (prefers-reduced-motion: reduce) {
	.timeline-guide {
		transition: none;
	}

	.hint-active :deep(.timeline-item:first-child) {
		animation: none;
	}
}
</style>
