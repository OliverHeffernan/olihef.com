import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
import AllProjects from '@/sections/AllProjects.vue'
import useLenis from '@/lenis/useLenis'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		const lenis = useLenis()

		if (savedPosition) {
			// Handle browser back/forward
			lenis.lenis?.scrollTo(savedPosition.top, { immediate: true })
			return savedPosition
		} else {
			// Scroll to top on new navigation
			lenis.lenis?.scrollTo(0, { immediate: true })
			return { top: 0 }
		}
	},
	routes: [
		{
			name: 'home',
			path: '/',
			component: LandingPage,
		},
		{
			name: 'project',
			path: '/projects/:projectName',
			component: ProjectDetailView,
			props: true,
		},
		{
			name: 'All Projects',
			path: '/projects',
			component: AllProjects,
		}
	],
})

export default router
