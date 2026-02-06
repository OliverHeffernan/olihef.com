<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
</script>
<template>
	<div class="about-me">
		<div class="margins">
			<i class="fa-solid fa-chevron-down scroll"></i>
			<h1>About Me</h1>
			<div class="flex-row">
				<p>Second-year Software Engineering student at Victoria University of Wellington with A+ average and Dean's List honours. Built and deployed multiple full-stack applications (Vue.js, Rust, Supabase) with live demos on GitHub. Seeking front-end/back-end internship to apply problem-solving skills and passion for user-focused solutions.</p>
				<div class="flex-column">
					<StatCard title="Coding For" :value="`${new Date().getFullYear() - 2017} years`" />
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

.about-me {
	margin-top: 20px;
	background-size: 40px 40px;
	background-position: -1px 0;
	background-image:
		linear-gradient(to right, var(--border) 1px, transparent 1px),
		linear-gradient(to bottom, var(--border) 1px, transparent 1px);
	padding-bottom: 30px;
}

h1 {
	padding: 10px;
	border: 1px solid var(--border);
	background-color: var(--bg);
}

p {
	padding: 20px;
	margin: 0;
	border: 1px solid var(--border);
	background-color: var(--bg);
}
</style>
