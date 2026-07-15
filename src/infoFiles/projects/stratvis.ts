import type Project from '@/classes/Project'

export default {
	title: 'StratVis',
	description: 'AI analysis of stratospheric imagery. Intended to showcase the potential for LLM technology in environmental analysis.',
	skills: ['typescript', 'vuejs', 'java', 'docker', 'sql'],
	screenshots: [
		{
			src: '/project-screenshots/stratvis/analysis-view.png',
			alt: 'StratVis analysis view showing a satellite map with environmental points of interest',
			caption: 'Analysis view with map overlays and AI-generated points of interest.',
		},
		{
			src: '/project-screenshots/stratvis/area-selection.png',
			alt: 'StratVis map selection view for defining geographic analysis bounds',
			caption: 'Map selection flow for defining analysis bounds.',
		},
		{
			src: '/project-screenshots/stratvis/generated-report.png',
			alt: 'StratVis generated environmental analysis report',
			caption: 'Generated output shown in the analysis experience.',
		},
		{
			src: '/project-screenshots/stratvis/session-history.png',
			alt: 'StratVis session history showing saved analysis snapshots',
			caption: 'Session and snapshot history view.',
		},
	],
	githubLink: 'https://github.com/OliverHeffernan/stratvis',
	siteLink: 'https://stratvis.olihef.com',
	topProject: true,
	year: 2026,
	articlePath: 'stratvis.md',
} satisfies Project
