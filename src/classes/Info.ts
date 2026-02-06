import type Skill from "./Skill"
import type Project from "./Project"

const skillsArray: Skill[] = [
	{ key: 'typescript', icon: 'typescript/typescript-original' },
	{ key: 'javascript', icon: 'javascript/javascript-original' },
	{ key: 'vuejs', icon: 'vuejs/vuejs-original' },
	{ key: 'go', icon: 'go/go-original-wordmark' },
	{ key: 'rust', icon: 'rust/rust-original' },
	{ key: 'supabase', icon: 'supabase/supabase-original' },
	{ key: 'tauri', icon: 'tauri/tauri-original' },
	{ key: 'unity', icon: 'unity/unity-original' }
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
		}
	]
}
