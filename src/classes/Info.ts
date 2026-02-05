import type Skill from "./Skill"

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
	public static readonly skills: Map<string, Skill> = new Map(skillsArray.map(skill => [skill.key, skill]));
	public static readonly skillCount: number = skillsArray.length;
}
