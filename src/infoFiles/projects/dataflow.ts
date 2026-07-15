import type Project from '@/classes/Project'

export default {
	title: 'DataFlow',
	description: 'A spread sheet app with vim-like motions.',
	skills: ['tauri', 'vuejs', 'javascript', 'rust'],
	screenshots: [
		{
			src: '/project-screenshots/dataflow/splash-screen.png',
			alt: 'DataFlow welcome screen listing keyboard commands for creating and opening spreadsheets',
			caption: 'Welcome screen and keyboard-first command reference.',
		},
		{
			src: '/project-screenshots/dataflow/spreadsheet-example.png',
			alt: 'DataFlow spreadsheet containing dates, notes, numeric data, and calculated summary rows',
			caption: 'A populated spreadsheet edited with Vim-like motions.',
		},
	],
	githubLink: 'https://github.com/OliverHeffernan/DataFlow',
	topProject: true,
	year: 2024,
	articlePath: 'dataflow.md',
} satisfies Project
