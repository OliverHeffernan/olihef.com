<script setup lang="ts">
import WorkContainer from '@/components/WorkContainer.vue';
</script>
<template>
	<div class="margins">
		<h1 class="boxHeader">Work Experience</h1>
		<div class="works">
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
				role="Crew Member"
				place="McDonald's Silverstream"
				start="Dec 2023"
				end="Mar 2026"
			/>
		</div>
	</div>
</template>
<style scoped>
.works {
	display: flex;
	flex-direction: column;
	gap: var(--gap);
	padding-bottom: var(--gap);
}

.margins {
	padding: var(--major-gap) 0;
}
</style>
