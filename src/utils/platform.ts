function getUserAgent(): string {
	if (typeof navigator === 'undefined') {
		return ''
	}
	return navigator.userAgent
}

export function isIOSBrowser(): boolean {
	if (typeof navigator === 'undefined') {
		return false
	}
	const ua = getUserAgent()
	const iOSDevice = /iP(ad|hone|od)/i.test(ua)
	const iPadOnMac = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
	return iOSDevice || iPadOnMac
}

export function isSafariBrowser(): boolean {
	const ua = getUserAgent()
	if (!ua) {
		return false
	}
	const isSafari = /Safari/i.test(ua)
	const isChromiumFamily = /Chrome|CriOS|Chromium|Edg|OPR/i.test(ua)
	return isSafari && !isChromiumFamily
}
