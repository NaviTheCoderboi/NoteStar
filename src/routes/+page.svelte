<script lang="ts">
	import { page } from '$app/stores';
	import Diary from '$lib/assets/diary.png';
	import SEO from '$lib/components/SEO.svelte';
	import Arrow from '$lib/components/icons/arrow.svelte';
	import Discord from '$lib/components/icons/discord.svelte';
	import Google from '$lib/components/icons/google.svelte';
	import { signIn } from '@auth/sveltekit/client';
</script>

<svelte:head>
	<SEO
		title="NoteStar: store your notes in the cloud"
		description="NoteStar is a free and open-source note-taking app that allows you to store your notes in the cloud."
		keywords={['note', 'notes', 'notestar', 'notestar.app', 'notestar.app', 'notestarapp']}
		author="NaviTheCoderboi"
		robots="index, follow"
		themeColor="#f43f5e"
		og={{
			title: 'NoteStar: store your notes in the cloud',
			description:
				'NoteStar is a free and open-source note-taking app that allows you to store your notes in the cloud.',
			image: '/favicon.png',
			type: 'website'
		}}
		twitter={{
			card: 'summary',
			creator: 'NaviTheCoderboi',
			title: 'NoteStar: store your notes in the cloud',
			description:
				'NoteStar is a free and open-source note-taking app that allows you to store your notes in the cloud.',
			image: '/favicon.png'
		}}
	/>
</svelte:head>
<main class="bg-slate-900 h-screen w-full grid place-items-center">
	<div class="flex justify-center gap-5 px-3 py-6 sm:p-10 rounded-2xl bg-slate-800">
		<img src={Diary} alt="diary" class="object-fill p-2 hidden sm:inline" />
		<div class="flex flex-col items-center justify-center gap-6 p-2">
			<h1 class="text-rose-500 text-5xl font-semibold text-center">NoteStar</h1>
			<p class="text-slate-300 font-light text-lg text-center">
				store your notes in cloud now!
			</p>
			{#if $page.data.session}
				<a
					href="/notes"
					class="bg-rose-400 flex justify-between items-center gap-8 px-4 py-2 rounded-lg hover:scale-[1.02] hover:brightness-110 duration-200 text-white"
				>
					<Arrow Class="h-12" />
					<span class="text-2xl font-normal font-mono">continue</span>
				</a>
			{:else}
				<nav class="flex flex-col justify-center items-center gap-5 py-6 px-3 w-full">
					<button
						class="w-full bg-white flex justify-between items-center gap-14 px-4 py-2 rounded-lg hover:scale-[1.02] duration-200"
						on:click={() => signIn('google')}
					>
						<Google Class="h-12" />
						<span class="text-2xl font-normal text-slate-900">Google</span>
					</button>
					<button
						class="w-full bg-[#5865F2] flex justify-between items-center gap-14 px-4 py-2 rounded-lg hover:scale-[1.02] duration-200"
						on:click={() => signIn('discord')}
					>
						<Discord Class="h-12" />
						<span class="text-2xl font-normal">Discord</span>
					</button>
				</nav>
			{/if}
		</div>
	</div>
</main>
