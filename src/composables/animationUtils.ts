import { type Ref } from 'vue'

// Helper to unwrap Vue refs or get element from selector
export function getElement(
	target: string | Element | Ref<Element | undefined>
): Element | null {
	if (typeof target === 'string') {
		return document.querySelector(target)
	}
	if ('value' in target) {
		return (target.value as Element) || null
	}
	return target
}

// Helper to get multiple elements
export function getElements(
	target: string | Element[] | NodeListOf<Element>,
): Element[] | NodeListOf<Element> {
	if (typeof target === 'string') {
		return document.querySelectorAll(target)
	}
	return target
}
