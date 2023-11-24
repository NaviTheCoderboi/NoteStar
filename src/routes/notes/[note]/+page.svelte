<script lang="ts">
	import { goto } from '$app/navigation';
	import Editor from '$lib/components/Editor.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Arrow from '$lib/components/icons/arrow.svelte';
	import Bin from '$lib/components/icons/bin.svelte';
	import Save from '$lib/components/icons/save.svelte';
	import type { OutputData } from '@editorjs/editorjs';
	import { format, formatDistance } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;

	const debounce = (func: Function, timeout = 800) => {
		let timer: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: any[]) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	};

	const updateTitle = debounce(async (v: string) => {
		const response = await (
			await fetch('/api/notes', {
				method: 'POST',
				body: JSON.stringify({
					action: 'update-title',
					data: {
						note_id: data.note?._id,
						title: v
					}
				}),
				headers: {
					'content-type': 'application/json'
				}
			})
		).json();
		if (response.success) {
			data.note?.updatedAt ? (data.note.updatedAt = new Date()) : null;
			data.note?.title ? (data.note.title = v) : null;
		}
	});

	const updateDescription = debounce(async (v: string) => {
		const response = await (
			await fetch('/api/notes', {
				method: 'POST',
				body: JSON.stringify({
					action: 'update-description',
					data: {
						note_id: data.note?._id,
						description: v
					}
				}),
				headers: {
					'content-type': 'application/json'
				}
			})
		).json();
		if (response.success) {
			data.note?.updatedAt ? (data.note.updatedAt = new Date()) : null;
			data.note?.description ? (data.note.description = v) : null;
		}
	});

	const saveNote = async (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => {
		const response = await (
			await fetch('/api/notes', {
				method: 'POST',
				body: JSON.stringify({
					action: 'update-note',
					data: {
						note_id: data.note?._id,
						title: data.note?.title,
						description: data.note?.description,
						content: content
					}
				}),
				headers: {
					'content-type': 'application/json'
				}
			})
		).json();
		if (response.success) {
			data.note?.title ? (data.note.title = data.note.title) : null;
			data.note?.description ? (data.note.description = data.note.description) : null;
			data.note?.updatedAt ? (data.note.updatedAt = new Date()) : null;
		}
	};

	const deleteNote = async (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => {
		const response = await (
			await fetch('/api/notes', {
				method: 'POST',
				body: JSON.stringify({
					action: 'delete-note',
					data: {
						note_id: data.note?._id
					}
				}),
				headers: {
					'content-type': 'application/json'
				}
			})
		).json();
		if (response.success) {
			goto('/notes');
		}
	};
	let content: OutputData = data.note?.content || { blocks: [] };
</script>

<svelte:head>
	<SEO
		title={data.note?.title || 'NoteStar: store your notes in the cloud'}
		description={data.note?.description ||
			'NoteStar is a free and open-source note-taking app that allows you to store your notes in the cloud.'}
		keywords={['note', 'notes', 'notestar', 'notestar.app', 'notestar.app', 'notestarapp']}
		author="NaviTheCoderboi"
		robots="index, follow"
		themeColor="#f43f5e"
		og={{
			title: data.note?.title || 'NoteStar: store your notes in the cloud',
			description:
				data.note?.description ||
				'NoteStar is a free and open-source note-taking app that allows you to store your notes in the cloud.',
			image: '/favicon.png',
			type: 'website'
		}}
		twitter={{
			card: 'summary',
			creator: 'NaviTheCoderboi',
			title: data.note?.title || 'NoteStar: store your notes in the cloud',
			description:
				data.note?.description ||
				'NoteStar is a free and open-source note-taking app that allows you to store your notes in the cloud.',
			image: '/favicon.png'
		}}
	/>
</svelte:head>
<main class="min-h-screen w-full bg-slate-800">
	<section class="flex flex-col gap-8 w-full px-4 md:px-0 md:w-2/3 mx-auto py-8">
		<div class="relative">
			<ul class="flex md:hidden justify-between items-center">
				<a href="/notes">
					<Arrow
						direction="left"
						Class="h-12 border-2 border-slate-500 rounded-md px-2 py-1"
					/>
				</a>

				<ul class="flex items-center justify-center gap-2">
					<button on:click={deleteNote}>
						<Bin
							Class="h-12 border-2 border-slate-500 rounded-md px-2 py-1 hover:border-red-500 hover:text-red-500 duration-200"
						/>
					</button>
					<button on:click={saveNote}>
						<Save
							Class="h-12 border-2 border-slate-500 rounded-md px-2 py-1 hover:border-sky-500 hover:text-sky-500 duration-200"
						/>
					</button>
				</ul>
			</ul>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<h1
				contentEditable
				class="text-4xl font-semibold w-fit mx-auto px-6 py-3 border-b-2 border-transparent focus:border-slate-500 duration-200 outline-none"
				on:keyup={(e) => updateTitle(e.currentTarget.textContent)}
			>
				{data.note?.title}
			</h1>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<p
				contenteditable
				class="text-2xl font-light py-3 text-slate-200 border-b-2 border-transparent focus:border-slate-500 duration-200 outline-none"
				on:keyup={(e) => updateDescription(e.currentTarget.textContent)}
			>
				{data.note?.description}
			</p>
			<ul class="flex justify-between items-center py-3">
				<li class="text-slate-300 text-lg md:text-xl font-light">
					{format(data.note?.createdAt || new Date(), 'dd/MM/yyyy')}
				</li>
				<li class="text-slate-300 text-lg md:text-xl font-light">
					{'updated ' +
						formatDistance(data.note?.updatedAt || new Date(), new Date(), {
							addSuffix: true
						})}
				</li>
			</ul>
			<a href="/notes" class="hidden md:inline absolute -left-16 top-2 cursor-pointer">
				<Arrow
					direction="left"
					Class="h-12 border-2 border-slate-500 rounded-md px-2 py-1"
				/>
			</a>
			<ul class="hidden md:flex absolute -right-16 top-2 flex-col justify-center gap-2">
				<button on:click={deleteNote}>
					<Bin
						Class="h-12 border-2 border-slate-500 rounded-md px-2 py-1 hover:border-red-500 hover:text-red-500 duration-200"
					/>
				</button>
				<button on:click={saveNote}>
					<Save
						Class="h-12 border-2 border-slate-500 rounded-md px-2 py-1 hover:border-sky-500 hover:text-sky-500 duration-200"
					/>
				</button>
			</ul>
		</div>
		<Editor bind:content />
	</section>
</main>
