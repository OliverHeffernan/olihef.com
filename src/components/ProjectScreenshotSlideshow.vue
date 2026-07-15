<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ProjectScreenshot } from '@/classes/Project'

const props = defineProps<{
	projectTitle: string
	screenshots: ProjectScreenshot[]
}>()

const activeIndex = ref(0)
const activeScreenshot = computed(() => props.screenshots[activeIndex.value])

watch(
	() => props.screenshots,
	() => {
		activeIndex.value = 0
	},
)

function showPrevious() {
	activeIndex.value =
		(activeIndex.value - 1 + props.screenshots.length) % props.screenshots.length
}

function showNext() {
	activeIndex.value = (activeIndex.value + 1) % props.screenshots.length
}

function handleKeydown(event: KeyboardEvent) {
	if (event.key === 'ArrowLeft') {
		showPrevious()
	} else if (event.key === 'ArrowRight') {
		showNext()
	} else if (event.key === 'Home') {
		activeIndex.value = 0
	} else if (event.key === 'End') {
		activeIndex.value = props.screenshots.length - 1
	} else {
		return
	}

	event.preventDefault()
}
</script>

<template>
	<section
		class="screenshot-slideshow"
		role="region"
		aria-roledescription="carousel"
		:aria-label="`${projectTitle} screenshots`"
	>
		<div class="slideshow-heading">
		</div>

		<div
			class="slideshow-stage"
			tabindex="0"
			aria-label="Use the left and right arrow keys to change screenshot"
			@keydown="handleKeydown"
		>
			<figure v-if="activeScreenshot">
				<img :src="activeScreenshot.src" :alt="activeScreenshot.alt" />
				<figcaption v-if="activeScreenshot.caption">
					{{ activeScreenshot.caption }}
				</figcaption>
			</figure>

			<template v-if="screenshots.length > 1">
				<button
					class="slide-control previous"
					type="button"
					aria-label="Show previous screenshot"
					@click="showPrevious"
				>
					<span aria-hidden="true">&#8592;</span>
				</button>
				<button
					class="slide-control next"
					type="button"
					aria-label="Show next screenshot"
					@click="showNext"
				>
					<span aria-hidden="true">&#8594;</span>
				</button>
			</template>
		</div>

		<div v-if="screenshots.length > 1" class="slide-dots" aria-label="Choose screenshot">
			<button
				v-for="(screenshot, index) in screenshots"
				:key="screenshot.src"
				type="button"
				:class="{ active: index === activeIndex }"
				:aria-label="`Show screenshot ${index + 1}: ${screenshot.alt}`"
				:aria-current="index === activeIndex ? 'true' : undefined"
				@click="activeIndex = index"
			/>
		</div>
	</section>
</template>

<style scoped>
.screenshot-slideshow {
	margin-bottom: calc(var(--gap) * 2);
}

.slideshow-heading {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: var(--gap);
	margin-bottom: var(--minor-gap);
}

.slideshow-heading h2 {
	margin: 0;
	font-size: 1.5rem;
}

.slideshow-heading span {
	color: var(--sec-text);
	font-family: var(--mono-font);
	font-size: 0.9rem;
}

.slideshow-stage {
	position: relative;
	overflow: hidden;
	border: 1px solid var(--border);
	border-radius: var(--border-radius);
	background: var(--border);
	outline: none;
}

.slideshow-stage:focus-visible {
	box-shadow: 0 0 0 3px var(--accent);
}

figure {
	margin: 0;
}

img {
	display: block;
	width: 100%;
	aspect-ratio: 16 / 10;
	object-fit: contain;
	background: var(--bg);
}

figcaption {
	padding: var(--minor-gap) var(--gap);
	border-top: 1px solid var(--border);
	background: var(--bg);
	color: var(--sec-text);
	font-size: 0.95rem;
}

.slide-control {
	position: absolute;
	top: 50%;
	width: 44px;
	height: 44px;
	transform: translateY(-50%);
	border: 1px solid var(--border);
	border-radius: 50%;
	background: color-mix(in srgb, var(--bg) 88%, transparent);
	color: var(--text);
	font-size: 1.25rem;
	cursor: pointer;
	transition: transform 0.2s ease, background-color 0.2s ease;
}

.slide-control:hover,
.slide-control:focus-visible {
	background: var(--bg);
	transform: translateY(-50%) scale(1.08);
}

.previous {
	left: var(--minor-gap);
}

.next {
	right: var(--minor-gap);
}

.slide-dots {
	display: flex;
	justify-content: center;
	gap: 8px;
	margin-top: var(--minor-gap);
}

.slide-dots button {
	width: 12px;
	height: 12px;
	padding: 0;
	border: 1px solid var(--border);
	border-radius: 50%;
	background: var(--bg);
	cursor: pointer;
}

.slide-dots button:hover,
.slide-dots button:focus-visible {
	border-color: var(--accent);
}

.slide-dots button.active {
	border-color: var(--accent);
	background: var(--accent);
}

@media (max-width: 600px) {
	.slide-control {
		width: 38px;
		height: 38px;
	}
}
</style>
