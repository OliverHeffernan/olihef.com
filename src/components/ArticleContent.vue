<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
	articlePath: string
}>()

const articleHtml = ref<string>('')
const md = new MarkdownIt()

onMounted(async () => {
	try {
		// Dynamically import the markdown file as raw text
		const modules = import.meta.glob<string>('@/infoFiles/articles/*.md', {
			query: '?raw',
			import: 'default',
		})

		const articleKey = `/src/infoFiles/articles/${props.articlePath}`
		const loadArticle = modules[articleKey]

		if (loadArticle) {
			const markdownContent = await loadArticle()
			articleHtml.value = md.render(markdownContent)
		} else {
			console.error(`Article not found: ${props.articlePath}`)
		}
	} catch (error) {
		console.error('Error loading article:', error)
	}
})
</script>

<template>
	<article class="article-wrapper">
		<div class="article-content margins" v-html="articleHtml"></div>
	</article>
</template>

<style scoped>
.article-wrapper {
	background-color: var(--bg);
	border-top: 1px solid var(--border);
	padding: calc(var(--gap) * 2) 0;
}

.article-content {
	font-size: 1.05rem;
	line-height: 1.8;
}

.article-content :deep(h1) {
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 1.5rem;
	margin-top: 0;
	padding-bottom: 0.5rem;
	border-bottom: 2px solid var(--border);
	color: var(--text);
}

.article-content :deep(h2) {
	font-size: 2rem;
	font-weight: 600;
	margin-bottom: 1rem;
	margin-top: 2.5rem;
	color: var(--text);
	padding-bottom: 0.25rem;
	border-bottom: 1px solid var(--border);
}

.article-content :deep(h3) {
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 0.75rem;
	margin-top: 2rem;
	color: var(--text);
}

.article-content :deep(p) {
	margin-bottom: 1.25rem;
	line-height: 1.8;
	color: var(--text);
}

.article-content :deep(strong) {
	font-weight: 600;
	color: var(--text);
}

.article-content :deep(em) {
	font-style: italic;
	color: var(--text);
}

.article-content :deep(ul),
.article-content :deep(ol) {
	margin-bottom: 1.25rem;
	padding-left: 2rem;
	line-height: 1.8;
}

.article-content :deep(li) {
	margin-bottom: 0.5rem;
	color: var(--text);
}

.article-content :deep(code) {
	background-color: var(--border);
	color: var(--text);
	padding: 0.2rem 0.5rem;
	border-radius: 4px;
	font-family: var(--mono-font);
	font-size: 0.9em;
}

.article-content :deep(pre) {
	background-color: var(--border);
	padding: 1.25rem;
	border-radius: var(--border-radius);
	overflow-x: auto;
	margin-bottom: 1.25rem;
	border: 1px solid var(--border);
}

.article-content :deep(pre code) {
	background-color: transparent;
	padding: 0;
	border-radius: 0;
}

.article-content :deep(blockquote) {
	border-left: 4px solid var(--accent);
	padding-left: 1.5rem;
	margin: 1.5rem 0;
	font-style: italic;
	color: var(--sec-text);
}

.article-content :deep(a) {
	color: var(--accent);
	text-decoration: none;
	border-bottom: 1px solid var(--accent);
	transition: opacity 0.2s ease;
}

.article-content :deep(a:hover) {
	opacity: 0.7;
}

.article-content :deep(hr) {
	border: none;
	border-top: 1px solid var(--border);
	margin: 2rem 0;
}

.article-content :deep(img) {
	max-width: 100%;
	height: auto;
	display: block;
	margin: 1rem 0 0.75rem;
	border-radius: 10px;
	border: 1px solid var(--border);
}

.article-content :deep(table) {
	width: 100%;
	border-collapse: collapse;
}
.article-content :deep(td:first-child) {
	white-space: nowrap;
}

.article-content :deep(td) {
	border: 1px solid var(--border);
	padding: 0.75rem;
	text-align: left;
}

.article-content :deep(th) {
	border: 1px solid var(--border);
	padding: 0.75rem;
	text-align: left;
	background-color: var(--border);
	font-weight: 600;
}

@media (max-width: 768px) {
	.article-content :deep(h1) {
		font-size: 2rem;
	}

	.article-content :deep(h2) {
		font-size: 1.5rem;
	}

	.article-content :deep(h3) {
		font-size: 1.25rem;
	}

	.article-content {
		font-size: 1rem;
	}
}
</style>
