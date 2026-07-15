import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, type Ref } from 'vue'
import { isIOSBrowser, isSafariBrowser } from '@/utils/platform'

gsap.registerPlugin(ScrollTrigger)

export interface HorizontalScrollJackOptions {
	scrub?: boolean | number // Link movement to scroll, optionally with catch-up smoothing
	markers?: boolean // Show debug markers (default: false)
	scrollMultiplier?: number | (() => number) // Multiplier for scroll distance (default: 1.5)
	horizontalDistanceMultiplier?: number | (() => number) // How much horizontal distance extends the vertical scroll
	pinSpacing?: boolean // Add spacing when pinned (default: true)
	onProgress?: (progress: number) => void
	onEnter?: () => void
}

/**
 * Creates a horizontal scroll-jacking effect where vertical scroll translates to horizontal movement
 * The container pins in the viewport while the scroller moves horizontally
 *
 * @param containerRef - Ref to the container element that will be pinned
 * @param scrollerRef - Ref to the element that will scroll horizontally
 * @param options - Configuration options
 * @returns ScrollTrigger instance (or null if refs are invalid)
 */
export function useHorizontalScrollJack(
	containerRef: Ref<HTMLElement | null>,
	scrollerRef: Ref<HTMLElement | null>,
	options: HorizontalScrollJackOptions = {},
): ScrollTrigger | null {
	const {
		scrub = 1,
		markers = false,
		scrollMultiplier = 1.5,
		horizontalDistanceMultiplier = 0.5,
		pinSpacing = true,
		onProgress,
		onEnter,
	} = options

	let trigger: ScrollTrigger | null = null

	onMounted(() => {
		const container = containerRef.value
		const scroller = scrollerRef.value

		if (!container || !scroller) {
			console.warn('useHorizontalScrollJack: Container or scroller ref is null')
			return
		}

		// Safari needs multiple animation frames + setTimeout for reliable layout calculations
		const initScrollTrigger = () => {
			const safariLike = isSafariBrowser() || isIOSBrowser()
			const resolveNumber = (value: number | (() => number)) =>
				typeof value === 'function' ? value() : value
			const getHorizontalDistance = () => scroller.scrollWidth - container.clientWidth
			const getScrollDuration = () =>
				window.innerHeight * resolveNumber(scrollMultiplier) +
				getHorizontalDistance() * resolveNumber(horizontalDistanceMultiplier)

			// Calculate the total horizontal scroll distance
			const scrollWidth = scroller.scrollWidth
			const containerWidth = container.clientWidth
			const horizontalDistance = getHorizontalDistance()

			// If there's no horizontal scroll needed, don't create the effect
			if (horizontalDistance <= 0) {
				console.warn(
					'useHorizontalScrollJack: No horizontal scroll needed (content fits in container)',
				)
				return
			}

			// Calculate vertical scroll distance dynamically based on horizontal distance
			// This ensures the scroll completes regardless of gap size or number of items
			const scrollDuration = getScrollDuration()

			console.log('📊 Horizontal scroll setup:', {
				scrollWidth,
				containerWidth,
				horizontalDistance,
				scrollDuration,
				itemsVisibleAtStart: Math.floor(containerWidth / 700), // Approx based on 700px min-width
			})

			// Optimize performance - use 3D transform for hardware acceleration (Safari)
			scroller.style.willChange = 'transform'

			// Create the horizontal scroll animation using gsap.to (more reliable than ScrollTrigger.create)
			const animation = gsap.to(scroller, {
				x: () => -getHorizontalDistance(),
				force3D: true,
				ease: 'none',
				scrollTrigger: {
					trigger: container,
					pin: true,
					pinType: safariLike ? 'transform' : undefined,
					pinSpacing: pinSpacing,
					start: 'top top', // Start pinning when container hits top of viewport
					end: () => `+=${getScrollDuration()}`,
					scrub: scrub, // Use scrub value from options
					markers: markers,
					anticipatePin: 1,
					invalidateOnRefresh: true, // Recalculate on refresh (important for Safari)
					fastScrollEnd: true, // Prevent snap back on fast scrolling (Safari)
					onUpdate: (self) => {
						onProgress?.(self.progress)
					},
					onEnter: () => {
						scroller.style.willChange = 'transform'
						onEnter?.()
					},
					onLeave: (self) => {
						self.animation?.progress(1)
						scroller.style.willChange = 'auto'
						onProgress?.(1)
					},
					onEnterBack: () => {
						scroller.style.willChange = 'transform'
						onEnter?.()
					},
					onLeaveBack: (self) => {
						self.animation?.progress(0)
						scroller.style.willChange = 'auto'
						onProgress?.(0)
					},
				},
			})

			trigger = animation.scrollTrigger || null

			// Force ScrollTrigger refresh after creation (Safari fix)
			setTimeout(() => {
				ScrollTrigger.refresh()
			}, 100)
		}

		// Multiple RAF + setTimeout for Safari compatibility
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setTimeout(initScrollTrigger, 50)
			})
		})
	})

	onUnmounted(() => {
		// Clean up ScrollTrigger on component unmount
		if (trigger) {
			trigger.kill()
			trigger = null
		}
	})

	return trigger
}
