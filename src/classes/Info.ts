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
	{ key: 'unity', name: 'Unity', icon: 'unity/unity-original' }
];

export default class Info {
	public static readonly skills: Map<string, Skill> = new Map(
		skillsArray.map(skill => [skill.key, skill])
	);
	public static readonly skillCount: number = skillsArray.length;
	public static readonly projects: Project[] = [
		{
			title: 'PaperWeight',
			description: 'A web application that I built to help me keep track of my gym workouts.',
			skills: ['vuejs', 'typescript', 'supabase'],
			githubLink: 'https://github.com/OliverHeffernan/paperWeight'
		},
		{
			title: 'DataFlow',
			description: 'An app to upload written workout logs, and digitise them using OpenAI.',
			skills: ['tauri', 'vuejs', 'javascript', 'rust'],
			githubLink: 'https://github.com/OliverHeffernan/paperWeight',
		},
		{
			title: 'movieGame',
			description: 'A simple guess the movie game. Makes requests to a Rust backend to get data from the TMDb API.',
			skills: ['vuejs', 'rust'],
			githubLink: 'https://github.com/OliverHeffernan/movieGame',
		},
		{
			title: 'RaceTracker',
			description: 'A free to use running race organiser. Fully editable results, exportable pdf results. All data is handled through JavaScript on the client-side, so your information is safe.',
			skills: ['javascript'],
			githubLink: 'https://github.com/OliverHeffernan/Racetracker',
		},
		{
			title: 'Lone Wolf: WW2',
			description: 'It is the dawn of World War 2 and you just joined the Royal Air Force! Fly over Europe and Northern Africa fighting against the enemy forces from above. Can you defeat the enemy and win the war?',
			skills: ['unity'],
			steamLink: 'https://store.steampowered.com/app/1399180/Lone_Wolf_World_War_2/',
		},
		{
			title: 'Ludwig-AI',
			description: 'A CLI-based AI task orchestrator that automates project work through pluggable AI client integrations. Co-developed with my brother.',
			skills: ['go'],
			githubLink: 'https://github.com/AlexanderHeffernan/Ludwig-AI',
		}
	]
}
