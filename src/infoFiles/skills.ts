import type Skill from '@/classes/Skill'

// Automatically import all skill files from the skills directory
const skillModules = import.meta.glob<{ default: Skill }>('./skills/*.ts', { eager: true })

// Extract the skills array from the imported modules
const skillsArray: Skill[] = Object.values(skillModules).map((module) => module.default)

// Create a Map for quick lookup by key
const skills: Map<string, Skill> = new Map(skillsArray.map((skill) => [skill.key, skill]))

export { skills, skillsArray }
