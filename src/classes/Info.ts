import type Skill from './Skill'
import type Project from './Project'
import { skills, skillsArray } from '@/infoFiles/skills'
import projects from '@/infoFiles/projects'

export default class Info {
	public static readonly skills: Map<string, Skill> = skills
	public static readonly skillCount: number = skillsArray.length
	public static readonly projects: Project[] = projects
}
