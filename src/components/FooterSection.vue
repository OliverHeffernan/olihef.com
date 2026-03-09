<script setup lang="ts">
import { ref } from 'vue'
import IconLink from './IconLink.vue'
import gsap from 'gsap'
import { useAnimatedGrid } from '@/composables/useAnimatedGrid'

const footerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const emailButtonRef = ref<HTMLElement | null>(null)
const copiedTextRef = ref<HTMLElement | null>(null)

// Initialize animated grid with hover effects
useAnimatedGrid(footerRef, gridRef, {
	enableHover: true,
	targetOpacity: 0.3,
	hoverOpacity: 0.6,
	scrollStart: 'top 80%',
	scrollEnd: 'top 20%',
	scrubValue: 1,
})

const copyToClipboard = async () => {
	const email = 'oliverheffernan@icloud.com'

	try {
		await navigator.clipboard.writeText(email)

		// Animate button on successful copy
		if (emailButtonRef.value && copiedTextRef.value) {
			// Button bounce animation
			gsap.to(emailButtonRef.value, {
				scale: 0.95,
				duration: 0.1,
				ease: 'power2.in',
				onComplete: () => {
					gsap.to(emailButtonRef.value, {
						scale: 1,
						duration: 0.3,
						ease: 'elastic.out(1, 0.5)',
					})
				},
			})

			// Show "Copied!" text with fade in/out
			gsap.timeline()
				.to(copiedTextRef.value, {
					opacity: 1,
					y: -10,
					duration: 0.3,
					ease: 'power2.out',
				})
				.to(copiedTextRef.value, {
					opacity: 0,
					y: -20,
					duration: 0.3,
					delay: 1.5,
					ease: 'power2.in',
				})
				.set(copiedTextRef.value, { y: 0 })
		}
	} catch (err) {
		console.error('Failed to copy email:', err)
	}
}
</script>

<template>
	<footer ref="footerRef" class="footer">
		<div ref="gridRef" class="animated-grid"></div>
		<div class="footer-content margins">
			<div class="main-content">
				<h2 class="tagline">Open to Opportunities</h2>
				<p class="description">
					I'm currently seeking software engineering roles and exciting projects. Let's
					build something great together.
				</p>
				<div class="email-container">
					<button ref="emailButtonRef" @click="copyToClipboard" class="email-button">
						<i class="fa-solid fa-envelope"></i>
						<span>oliverheffernan@icloud.com</span>
						<i class="fa-solid fa-copy copy-icon"></i>
					</button>
					<span ref="copiedTextRef" class="copied-text">Copied!</span>
				</div>
			</div>

			<div class="social-links">
				<IconLink
					icon="fa-brands fa-github"
					route="https://github.com/OliverHeffernan"
					external
				>
					GitHub
				</IconLink>
				<IconLink
					icon="fa-brands fa-linkedin"
					route="https://www.linkedin.com/in/oliver-heffernan/"
					external
				>
					LinkedIn
				</IconLink>
			</div>

			<div class="copyright">© {{ new Date().getFullYear() }} Oliver Heffernan</div>
		</div>
	</footer>
</template>

<style scoped>
.footer {
	position: relative;
	width: 100%;
	border-top: 1px solid var(--border);
	padding: var(--major-gap) 0;
	background-color: var(--bg);
	overflow: hidden;
}

.animated-grid {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	--grid-color: var(--border);
	background-image:
		linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
		linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
	background-size: 50px 50px;
	background-position: center;
	opacity: 0;
	pointer-events: none;
	z-index: 0;
}

.footer-content {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: var(--gap);
	align-items: center;
	text-align: center;
}

.main-content {
	display: flex;
	flex-direction: column;
	gap: var(--minor-gap);
	max-width: 600px;
	align-items: center;
}

.tagline {
	font-size: 2rem;
	font-weight: 700;
	margin: 0;
	color: var(--text);
}

.description {
	font-size: 1.1rem;
	color: var(--sec-text);
	margin: 0;
	line-height: 1.6;
}

.email-container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: var(--minor-gap);
}

.email-button {
	display: inline-flex;
	align-items: center;
	gap: var(--minor-gap);
	padding: var(--minor-gap) var(--gap);
	background-color: var(--bg);
	color: var(--accent);
	border: 2px solid var(--accent);
	border-radius: var(--border-radius);
	font-size: 1.1rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;
	font-family: inherit;
	position: relative;
}

.email-button:hover {
	background-color: var(--accent);
	color: var(--bg);
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(65, 184, 131, 0.3);
}

.email-button:active {
	transform: translateY(0);
}

.email-button i.fa-envelope {
	font-size: 1.2rem;
}

.copy-icon {
	font-size: 0.9rem;
	opacity: 0.7;
	transition: opacity 0.3s ease;
}

.email-button:hover .copy-icon {
	opacity: 1;
}

.copied-text {
	position: absolute;
	top: -30px;
	left: 50%;
	transform: translateX(-50%);
	background-color: var(--accent);
	color: var(--bg);
	padding: 5px 15px;
	border-radius: 5px;
	font-size: 0.9rem;
	font-weight: 600;
	opacity: 0;
	pointer-events: none;
	white-space: nowrap;
}

.social-links {
	display: flex;
	gap: var(--gap);
	flex-wrap: wrap;
	justify-content: center;
	margin-top: var(--gap);
	padding: var(--minor-gap);
	border-radius: var(--border-radius);
}

.copyright {
	margin-top: var(--gap);
	padding-top: var(--gap);
	border-top: 1px solid var(--border);
	color: var(--sec-text);
	font-size: 0.9rem;
	width: 100%;
}

/* Responsive */
@media (max-width: 600px) {
	.tagline {
		font-size: 1.5rem;
	}

	.description {
		font-size: 1rem;
	}

	.email-button {
		font-size: 0.95rem;
		padding: var(--minor-gap);
	}

	.email-button span {
		font-size: 0.85rem;
	}

	.social-links {
		flex-direction: column;
		width: 100%;
	}
}
</style>
