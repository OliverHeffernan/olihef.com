import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
		{
			name: 'home',
			path: '/',
			component: LandingPage,
		},
		{
			name: 'project',
			path: '/project/:projectName',
			component: ProjectDetailView,
			props: true,
		}
	],
})

export default router
