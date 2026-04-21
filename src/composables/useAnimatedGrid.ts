import { onMounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isIOSBrowser, isSafariBrowser } from '@/utils/platform'

gsap.registerPlugin(ScrollTrigger)

export interface AnimatedGridOptions {
	/** Enable hover effects (opacity + scale changes) */
	enableHover?: boolean
	/** Initial opacity of the grid */
	initialOpacity?: number
	/** Opacity on hover (if enableHover is true) */
	hoverOpacity?: number
	/** Target opacity for scroll fade-in */
	targetOpacity?: number
	/** ScrollTrigger start position (e.g., 'top 80%') */
	scrollStart?: string
	/** ScrollTrigger end position for color animation (e.g., 'top 20%') */
	scrollEnd?: string
	/** Scrub value for color transition smoothness */
	scrubValue?: number
	/** Keep grid stationary while page scrolls (uses background-attachment: fixed) */
	stationary?: boolean
}

/**
 * Creates an animated grid background that transitions from border color to accent color on scroll
 * Optionally adds hover effects for opacity and scale
 *
 * @param containerRef - Ref to the container element (for scroll trigger)
 * @param gridRef - Ref to the grid element to animate
 * @param options - Configuration options
 */
export function useAnimatedGrid(
	containerRef: Ref<HTMLElement | null>,
	gridRef: Ref<HTMLElement | null>,
	options: AnimatedGridOptions = {},
) {
	const {
		enableHover = false,
		initialOpacity = 0,
		hoverOpacity = 0.6,
		targetOpacity = 0.3,
		scrollStart = 'top 80%',
		scrollEnd = 'top 20%',
		scrubValue = 1,
		stationary = false,
	} = options

	onMounted(() => {
		const container = containerRef.value
		const grid = gridRef.value

		if (!container || !grid) {
			console.warn('useAnimatedGrid: Container or grid ref is null')
			return
		}

		// Get CSS custom properties
		const borderColor = getComputedStyle(document.documentElement)
			.getPropertyValue('--border')
			.trim()
		const accentColor = getComputedStyle(document.documentElement)
			.getPropertyValue('--accent')
			.trim()

		// Set initial grid color to border color
		gsap.set(grid, {
			'--grid-color': borderColor,
		})

		// Make grid stationary if requested (using background-attachment)
		const shouldUseStationaryBackground = stationary && !isSafariBrowser() && !isIOSBrowser()
		if (shouldUseStationaryBackground) {
			grid.style.backgroundAttachment = 'fixed'
		} else {
			grid.style.backgroundAttachment = 'scroll'
		}

		// Animate grid color from border to accent on scroll
		gsap.to(grid, {
			'--grid-color': accentColor,
			scrollTrigger: {
				trigger: container,
				start: scrollStart,
				end: scrollEnd,
				scrub: scrubValue,
			},
		})

		// Fade in animation (no y transform to keep grid stationary)
		gsap.fromTo(
			grid,
			{ opacity: initialOpacity },
			{
				opacity: targetOpacity,
				duration: 1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: container,
					start: scrollStart,
					toggleActions: 'play none none none',
				},
			},
		)

		// Add hover effects if enabled
		if (enableHover) {
			let hoverTween: gsap.core.Tween | null = null

			container.addEventListener('mouseenter', () => {
				if (hoverTween) hoverTween.kill()
				hoverTween = gsap.to(grid, {
					opacity: hoverOpacity,
					scale: 1.02,
					duration: 0.6,
					ease: 'power2.out',
					overwrite: 'auto',
				})
			})

			container.addEventListener('mouseleave', () => {
				if (hoverTween) hoverTween.kill()
				hoverTween = gsap.to(grid, {
					opacity: targetOpacity,
					scale: 1,
					duration: 0.6,
					ease: 'power2.out',
					overwrite: 'auto',
				})
			})
		}
	})
}
