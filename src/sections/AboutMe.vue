<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import ImageBox from '@/components/ImageBox.vue'
import { useScrollReveal, type ScrollRevealOptions } from '@/composables/useScrollAnimations'

const options: ScrollRevealOptions = {
	duration: 0.5,
	delay: 0.1,
}
useScrollReveal('#aboutHeader', options)
useScrollReveal('.boxP', { ...options, delay: 0.3 })
useScrollReveal('.stats', { ...options, delay: 0.5 })
useScrollReveal('.images', { ...options, delay: 0.7 })

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
				<div class="images">
					<ImageBox
						imageName="profile_picture.jpeg"
						alt="Profile Picture"
						width="200"
						height="200"
						profile
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.scroll {
	width: 100%;
	text-align: center;
	font-size: 2rem;
	margin-top: var(--gap);
}

.flex-row p {
	flex: 2;
}

@media (max-width: 600px) {
	.flex-row {
		flex-direction: column-reverse;
	}
}

.stats {
	flex: 1;
}

.about-me {
	box-sizing: border-box;
	margin-top: var(--gap);
	border-top: 1px solid var(--border);
	border-bottom: 1px solid var(--border);
	padding: var(--major-gap) 0;
}
</style>
