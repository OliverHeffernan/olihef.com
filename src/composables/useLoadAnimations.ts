import gsap from 'gsap'
import { onMounted, onUnmounted, type Ref } from 'vue'

import { getElement, getElements } from './animationUtils'


interface SwoopInOptions {
	duration: number,
	delay: number,
}

export function useSwoopIn(
	target: string | Element[] | NodeListOf<Element>,
	options: Partial<SwoopInOptions> = {}
) {
	const { duration = 1.2, delay = 0 } = options

	let animation: gsap.core.Tween | null = null

	onMounted(() => {
		const elements = getElements(target)
		if (elements.length === 0) {
			console.warn('useSwoopIn: No elements found for', target)
			return
		}

		animation = gsap.from(elements, {
			y: -100,
			scale: 0.7,
			opacity: 0,
			duration,
			ease: 'back.out(1.7)',
			stagger: 0.1,
			delay,
		})
		animation.play()
	})
}
