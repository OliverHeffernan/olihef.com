<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import { useScrollReveal, type ScrollRevealOptions } from '@/composables/useScrollAnimations'

const options: ScrollRevealOptions = {
	duration: 0.5,
	delay: 0.1,
}
useScrollReveal('#aboutHeader', options)
useScrollReveal('.boxP', { ...options, delay: 0.3 })
useScrollReveal('.stats', { ...options, delay: 0.5 })

</script>
<template>
	<div class="about-me">
		<div class="margins">
			<h1 class="boxHeader" id="aboutHeader">About Me</h1>
			<div class="flex-row">
				<p class="boxP">
					Second-year Software Engineering student at Victoria University of Wellington
					with A+ average and Dean's List honours. Built and deployed multiple full-stack
					applications (Vue.js, Rust, Supabase) with live demos on GitHub. Seeking
					front-end/back-end internship to apply problem-solving skills and passion for
					user-focused solutions.
				</p>
				<div class="flex-column stats">
					<StatCard
						title="Coding For"
						:value="`${new Date().getFullYear() - 2017} years`"
					/>
					<StatCard title="GitHub Commits" value="950+" />
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.scroll {
	width: 100%;
	text-align: center;
	font-size: 2rem;
	margin-top: 20px;
}

.flex-row p {
	flex: 2;
}

@media (max-width: 600px) {
	.flex-row {
		flex-direction: column;
	}
}

.stats {
	flex: 1;
}

.about-me {
	box-sizing: border-box;
	margin-top: 20px;
	border-top: 1px solid var(--border);
	border-bottom: 1px solid var(--border);
	padding-bottom: 20px;
}
</style>
