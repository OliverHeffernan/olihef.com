import type Project from '@/classes/Project'

// Automatically import all project files from the projects directory
const projectModules = import.meta.glob<{ default: Project }>('./projects/*.ts', { eager: true })

// Extract the projects array from the imported modules
const projects: Project[] = Object.values(projectModules).map((module) => module.default)

export default projects
