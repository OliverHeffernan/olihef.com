import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, type Ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

// Type for animation options
export interface ScrollRevealOptions {
	y?: number // Starting Y offset (default: 60)
	opacity?: number // Starting opacity (default: 0)
	duration?: number // Animation duration (default: 1)
	delay?: number // Delay before animation starts (default: 0)
	ease?: string // Easing function (default: 'power3.out')
	start?: string // ScrollTrigger start position (default: 'top 80%')
	end?: string // ScrollTrigger end position (default: 'bottom 20%')
	markers?: boolean // Show debug markers (default: false)
	scrub?: boolean | number // Link animation to scroll (default: false)
}

interface StaggerRevealOptions extends ScrollRevealOptions {
	stagger?: number // Delay between each element (default: 0.15)
}

export interface ParallaxOptions {
	y?: number // Distance to move (default: 100)
	speed?: number // Parallax speed multiplier (default: 0.5)
	scrub?: number // Scrub smoothness (default: 1)
	start?: string // ScrollTrigger start (default: 'top bottom')
	end?: string // ScrollTrigger end (default: 'bottom top')
	markers?: boolean // Show debug markers (default: false)
}

// Helper to unwrap Vue refs or get element from selector
function getElement(target: string | Element | Ref<Element | undefined>): Element | null {
	if (typeof target === 'string') {
		return document.querySelector(target)
	}
	if ('value' in target) {
		return (target.value as Element) || null
	}
	return target
}

// Helper to get multiple elements
function getElements(
	target: string | Element[] | NodeListOf<Element>,
): Element[] | NodeListOf<Element> {
	if (typeof target === 'string') {
		return document.querySelectorAll(target)
	}
	return target
}

/**
 * Fade + slide up animation triggered on scroll
 * Usage: useScrollReveal('.my-element', { duration: 1.2 })
 */
export function useScrollReveal(
	target: string | Element | Ref<Element | undefined>,
	options: ScrollRevealOptions = {},
): ScrollTrigger | null {
	const {
		y = 60,
		opacity = 0,
		duration = 1,
		delay = 0,
		ease = 'power3.out',
		start = 'top 80%',
		end = 'bottom 20%',
		markers = false,
		scrub = false,
	} = options

	let trigger: ScrollTrigger | null = null

	onMounted(() => {
		const element = getElement(target)
		if (!element) {
			console.warn('useScrollReveal: Element not found', target)
			return
		}

		gsap.from(element, {
			y,
			opacity,
			duration,
			delay,
			ease,
			scrollTrigger: {
				trigger: element,
				start,
				end,
				markers,
				scrub,
				toggleActions: 'play none none reverse',
				onEnter: () => {
					// Optional: Add will-change for performance
					;(element as HTMLElement).style.willChange = 'transform, opacity'
				},
				onLeave: () => {
					;(element as HTMLElement).style.willChange = 'auto'
				},
			},
			onComplete: () => {
				;(element as HTMLElement).style.willChange = 'auto'
			},
		})

		// Store the ScrollTrigger instance
		trigger = ScrollTrigger.getById(element.id) || ScrollTrigger.getAll().pop() || null
	})

	onUnmounted(() => {
		if (trigger) {
			trigger.kill()
		}
	})

	return trigger
}

/**
 * Staggered fade + slide up for multiple elements
 * Usage: useStaggerReveal('.project-card', { stagger: 0.2 })
 */
export function useStaggerReveal(
	target: string | Element[] | NodeListOf<Element>,
	options: StaggerRevealOptions = {},
): ScrollTrigger[] {
	const {
		y = 60,
		opacity = 0,
		duration = 1,
		delay = 0,
		ease = 'power3.out',
		start = 'top 80%',
		end = 'bottom 20%',
		markers = false,
		stagger = 0.15,
		scrub = false,
	} = options

	const triggers: ScrollTrigger[] = []

	onMounted(() => {
		const elements = getElements(target)
		if (!elements.length) {
			console.warn('useStaggerReveal: No elements found', target)
			return
		}

		// Calculate total animation time
		const totalTime = duration + delay + stagger * (elements.length - 1)

		// Set initial state immediately - elements still take up layout space
		gsap.set(elements, {
			autoAlpha: 0,
			y,
		})

		const animation = gsap.to(elements, {
			y: 0,
			autoAlpha: 1,
			duration,
			delay,
			ease,
			stagger,
			scrollTrigger: {
				trigger: elements[0],
				start,
				end,
				markers,
				scrub,
				toggleActions: 'play none none reverse',
				fastScrollEnd: true,
			},
		})

		// Only refresh ScrollTrigger AFTER all animations complete
		setTimeout(
			() => {
				ScrollTrigger.refresh()
			},
			totalTime * 1000 + 100,
		)

		// Store all ScrollTrigger instances
		triggers.push(...ScrollTrigger.getAll().slice(-elements.length))
	})

	onUnmounted(() => {
		triggers.forEach((trigger) => trigger.kill())
	})

	return triggers
}

/**
 * Parallax effect - element moves at different speed than scroll
 * Usage: useParallax('.grid-background', { y: 100, speed: 0.5 })
 */
export function useParallax(
	target: string | Element | Ref<Element | undefined>,
	options: ParallaxOptions = {},
): ScrollTrigger | null {
	const {
		y = 100,
		speed = 0.5,
		scrub = 1,
		start = 'top bottom',
		end = 'bottom top',
		markers = false,
	} = options

	let trigger: ScrollTrigger | null = null

	onMounted(() => {
		const element = getElement(target)
		if (!element) {
			console.warn('useParallax: Element not found', target)
			return
		}

		// Calculate actual movement based on speed
		const movement = y * speed

		gsap.to(element, {
			y: movement,
			ease: 'none',
			scrollTrigger: {
				trigger: element,
				start,
				end,
				scrub,
				markers,
				onEnter: () => {
					;(element as HTMLElement).style.willChange = 'transform'
				},
				onLeave: () => {
					;(element as HTMLElement).style.willChange = 'auto'
				},
			},
		})

		trigger = ScrollTrigger.getById(element.id) || ScrollTrigger.getAll().pop() || null
	})

	onUnmounted(() => {
		if (trigger) {
			trigger.kill()
		}
	})

	return trigger
}

/**
 * Batch utility for animating many similar elements efficiently
 * Usage: useBatchReveal('.list-item')
 */
export function useBatchReveal(target: string, options: StaggerRevealOptions = {}): void {
	const { y = 60, opacity = 0, duration = 1, ease = 'power3.out', stagger = 0.1 } = options

	onMounted(() => {
		ScrollTrigger.batch(target, {
			onEnter: (batch) => {
				gsap.from(batch, {
					y,
					opacity,
					duration,
					ease,
					stagger,
					overwrite: true,
				})
			},
			start: 'top 80%',
		})
	})

	onUnmounted(() => {
		ScrollTrigger.getAll().forEach((trigger) => {
			if (trigger.vars.trigger === target) {
				trigger.kill()
			}
		})
	})
}

/**
 * Utility to refresh all ScrollTriggers (call after layout changes)
 */
export function refreshScrollTriggers(): void {
	ScrollTrigger.refresh()
}

/**
 * Utility to kill all ScrollTriggers (useful for cleanup)
 */
export function killAllScrollTriggers(): void {
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
