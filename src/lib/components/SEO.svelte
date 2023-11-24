<script lang="ts">
	export let title: string;
	export let description: string;
	export let keywords: string[];
	export let author: string;
	export let robots: string;
	export let themeColor: string;
	export let og: {
		title: string;
		description: string;
		image: string;
		type: string;
	};
	export let twitter: {
		card: string;
		creator: string;
		title: string;
		description: string;
		image: string;
	};
</script>

<title>{title}</title>
<meta name="description" content={description} />
<meta name="keywords" content={keywords.join(', ')} />
<meta name="author" content={author} />
<meta name="robots" content={robots} />
<meta name="theme-color" content={themeColor} />

<meta property="og:title" content={og.title} />
<meta property="og:description" content={og.description} />
<meta property="og:image" content={og.image} />
<meta property="og:type" content={og.type} />
<meta name="twitter:card" content={twitter.card} />
<meta name="twitter:creator" content={twitter.creator} />
<meta name="twitter:title" content={twitter.title} />
<meta name="twitter:description" content={twitter.description} />
<meta name="twitter:image" content={twitter.image} />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="generator" content="SvelteKit: v1.27.2" />
<link rel="icon" href="/favicon.png" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
