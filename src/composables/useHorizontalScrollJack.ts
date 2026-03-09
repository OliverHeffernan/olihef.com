import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, type Ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export interface HorizontalScrollJackOptions {
	scrub?: number // Scrub smoothness (default: 1)
	markers?: boolean // Show debug markers (default: false)
	scrollMultiplier?: number // Multiplier for scroll distance (default: 1.5)
	pinSpacing?: boolean // Add spacing when pinned (default: true)
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
	options: HorizontalScrollJackOptions = {}
): ScrollTrigger | null {
	const {
		scrub = 1,
		markers = false,
		scrollMultiplier = 1.5,
		pinSpacing = true
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
			// Calculate the total horizontal scroll distance
			const scrollWidth = scroller.scrollWidth
			const containerWidth = container.clientWidth
			const horizontalDistance = scrollWidth - containerWidth

			console.log('Horizontal scroll setup:', {
				scrollWidth,
				containerWidth,
				horizontalDistance
			})

			// If there's no horizontal scroll needed, don't create the effect
			if (horizontalDistance <= 0) {
				console.warn('useHorizontalScrollJack: No horizontal scroll needed (content fits in container)')
				return
			}

			// Calculate vertical scroll distance dynamically based on horizontal distance
			// This ensures the scroll completes regardless of gap size
			const baseScrollDuration = window.innerHeight * scrollMultiplier
			// Add extra scroll distance proportional to content width (ensures full scroll)
			const scrollDuration = baseScrollDuration + (horizontalDistance * 0.3)

			// Optimize performance - use 3D transform for hardware acceleration (Safari)
			scroller.style.willChange = 'transform'
			scroller.style.transform = 'translate3d(0, 0, 0)'

			// Create the horizontal scroll animation using gsap.to (more reliable than ScrollTrigger.create)
			const animation = gsap.to(scroller, {
				x: -horizontalDistance,
				ease: 'none',
				scrollTrigger: {
					trigger: container,
					pin: true,
					pinSpacing: pinSpacing,
					start: 'center center',
					end: `+=${scrollDuration}`,
					scrub: scrub,
					markers: markers,
					anticipatePin: 1,
					invalidateOnRefresh: true, // Recalculate on refresh (important for Safari)
					onLeave: () => {
						scroller.style.willChange = 'auto'
					},
					onEnterBack: () => {
						scroller.style.willChange = 'transform'
					}
				}
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
