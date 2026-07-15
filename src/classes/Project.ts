export interface ProjectScreenshot {
	src: string
	alt: string
	caption?: string
}

export default interface Project {
	title: string
	description: string
	skills: string[]
	screenshots?: ProjectScreenshot[]
	githubLink?: string
	steamLink?: string
	siteLink?: string
	topProject?: boolean
	hasCaseStudy?: boolean
	year: number
	articlePath?: string
}
