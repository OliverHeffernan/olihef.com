import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class UseLenis {
	public static instance: UseLenis
	public lenis: Lenis | null = null

	constructor() {
		if (UseLenis.instance) {
			return UseLenis.instance
		}

		UseLenis.instance = this

		// Configure ScrollTrigger BEFORE creating Lenis
		ScrollTrigger.config({
			autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
			ignoreMobileResize: true,
		})

		this.lenis = new Lenis({
			autoRaf: true,
			duration: 1.1,
			infinite: false,
			syncTouch: true,
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
			prevent: (node) => node.classList.contains('no-lenis'),
		})

		// Connect Lenis scroll to GSAP ScrollTrigger
		this.lenis.on('scroll', (e) => {
			ScrollTrigger.update()
		})

		// Prevent auto-refresh during scroll to avoid jolts
		window.addEventListener('resize', () => {
			this.lenis?.resize()
			ScrollTrigger.refresh()
		})

	}
}

export default function useLenis() {
	return new UseLenis()
}
