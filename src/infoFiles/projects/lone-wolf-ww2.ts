import type Project from '@/classes/Project'

export default {
	title: 'Lone Wolf: WW2',
	description:
		'A game set in World War 2. The player is an RAF pilot. Co-developed with my brother. Available on Steam.',
	skills: ['unity', 'csharp'],
	screenshots: [
		{
			src: '/project-screenshots/lone-wolf-ww2/forest-combat.jpg',
			alt: 'Lone Wolf WW2 aircraft flying over a forest during ground combat',
			caption: 'Low-altitude combat over a forest battlefield.',
		},
		{
			src: '/project-screenshots/lone-wolf-ww2/airfield.jpg',
			alt: 'Lone Wolf WW2 aircraft flying over a military airfield',
			caption: 'An attack run over an enemy airfield.',
		},
		{
			src: '/project-screenshots/lone-wolf-ww2/tank-combat.jpg',
			alt: 'Lone Wolf WW2 aircraft attacking tanks on a battlefield',
			caption: 'Ground attack against an armoured formation.',
		},
		{
			src: '/project-screenshots/lone-wolf-ww2/coastal-combat.jpg',
			alt: 'Lone Wolf WW2 aircraft attacking targets beside the coast',
			caption: 'A coastal ground-attack mission.',
		},
		{
			src: '/project-screenshots/lone-wolf-ww2/snowy-airfield.jpg',
			alt: 'Lone Wolf WW2 aircraft attacking a snow-covered airfield',
			caption: 'Winter combat over a snow-covered airfield.',
		},
		{
			src: '/project-screenshots/lone-wolf-ww2/snowy-base.jpg',
			alt: 'Lone Wolf WW2 aircraft flying above a snowy military base',
			caption: 'A low-level pass over a winter military base.',
		},
	],
	steamLink: 'https://store.steampowered.com/app/1399180/Lone_Wolf_World_War_2/',
	topProject: true,
	year: 2020,
	articlePath: 'lone-wolf-ww2.md',
} satisfies Project
