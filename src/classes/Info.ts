import type Skill from "./Skill"
import type Project from "./Project"

const skillsArray: Skill[] = [
	{ key: 'typescript', name: 'TypeScript', icon: 'typescript/typescript-original' },
	{ key: 'javascript', name: 'JavaScript', icon: 'javascript/javascript-original' },
	{ key: 'vuejs', name: 'Vue.js', icon: 'vuejs/vuejs-original' },
	{ key: 'go', name: 'Go', icon: 'go/go-original-wordmark' },
	{ key: 'rust', name: 'Rust', icon: 'rust/rust-original' },
	{ key: 'supabase', name: 'Supabase', icon: 'supabase/supabase-original' },
	{ key: 'tauri', name: 'Tauri', icon: 'tauri/tauri-original' },
	{ key: 'unity', name: 'Unity', icon: 'unity/unity-original' },
	{ key: 'csharp', name: 'C#', icon: 'csharp/csharp-original' },
];

export default class Info {
	public static readonly skills: Map<string, Skill> = new Map(
		skillsArray.map(skill => [skill.key, skill])
	);
	public static readonly skillCount: number = skillsArray.length;
	public static readonly projects: Project[] = [
		{
			title: 'PaperWeight',
			description: 'Full-stack app to digitise written workout logs through OpenAI. Accepted in Strava Developer Program.',
			skills: ['vuejs', 'typescript', 'supabase'],
			githubLink: 'https://github.com/OliverHeffernan/paperWeight',
			siteLink: 'https://paperweight.olihef.com',
			topProject: true,
			year: 2025,
		},
		{
			title: 'DataFlow',
			description: 'A spread sheet app with vim-like motions.',
			skills: ['tauri', 'vuejs', 'javascript', 'rust'],
			githubLink: 'https://github.com/OliverHeffernan/paperWeight',
			topProject: true,
			year: 2024
		},
		{
			title: 'movieGame',
			description: 'A simple guess the movie game. Makes requests to a Rust backend to get data from the TMDb API.',
			skills: ['vuejs', 'rust'],
			githubLink: 'https://github.com/OliverHeffernan/movieGame',
			year: 2025
		},
		{
			title: 'RaceTracker',
			description: 'A running race organiser. Fully editable results, exportable pdf results.',
			skills: ['javascript'],
			githubLink: 'https://github.com/OliverHeffernan/Racetracker',
			topProject: true,
			year: 2023
		},
		{
			title: 'Lone Wolf: WW2',
			description: 'A game set in World War 2. The player is an RAF pilot. Co-developed with my brother. Available on Steam.',
			skills: ['unity', 'csharp'],
			steamLink: 'https://store.steampowered.com/app/1399180/Lone_Wolf_World_War_2/',
			topProject: true,
			year: 2020,
		},
		{
			title: 'Ludwig-AI',
			description: 'A CLI-based AI task orchestrator that automates project work. Co-developed with my brother.',
			skills: ['go'],
			githubLink: 'https://github.com/AlexanderHeffernan/Ludwig-AI',
			year: 2026
		}
	]
}
