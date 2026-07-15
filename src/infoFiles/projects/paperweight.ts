import type Project from '@/classes/Project'

export default {
	title: 'PaperWeight',
	description:
		'Full-stack app to digitise written workout logs through OpenAI. Accepted in Strava Developer Program.',
	skills: ['vuejs', 'typescript', 'supabase'],
	screenshots: [
		{
			src: '/project-screenshots/paperweight/workout-history.png',
			alt: 'PaperWeight home screen showing recent upper- and lower-body workouts',
			caption: 'Workout history with recent sessions and summary metrics.',
		},
		{
			src: '/project-screenshots/paperweight/view-workout.png',
			alt: 'PaperWeight workout detail screen showing duration, volume, sets, and exercises',
			caption: 'Detailed workout view with session totals and exercise sets.',
		},
		{
			src: '/project-screenshots/paperweight/monthly-stats.png',
			alt: 'PaperWeight statistics dashboard with monthly totals and a volume chart',
			caption: 'Monthly training statistics and volume trends.',
		},
		{
			src: '/project-screenshots/paperweight/exercise-prs.png',
			alt: 'PaperWeight exercise records screen listing personal best weights',
			caption: 'Sortable exercise personal records.',
		},
	],
	githubLink: 'https://github.com/OliverHeffernan/paperWeight',
	siteLink: 'https://paperweight.olihef.com',
	topProject: true,
	year: 2025,
	articlePath: 'paperweight.md',
} satisfies Project
