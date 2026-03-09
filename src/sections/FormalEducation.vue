<script setup lang="ts">
import WorkContainer from '@/components/WorkContainer.vue';
</script>
<template>
	<section>
		<div class="margins">
			<h1 class="boxHeader">Formal Education</h1>
			<div class="works">
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
	</section>
</template>
<style scoped>
.works {
	display: flex;
	flex-direction: column;
	gap: var(--gap);
}

section {
	border-top: 1px solid var(--border);
}

.margins {
	padding: var(--major-gap) 0;
}
</style>
