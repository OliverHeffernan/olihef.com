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
			limitCallbacks: true, // Prevent excessive callbacks during scroll
		})

		this.lenis = new Lenis({
			autoRaf: true,
			duration: 1.2, // Slightly longer duration for smoother transitions
			infinite: false,
			syncTouch: true,
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 1,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smoother Safari scrolling
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
