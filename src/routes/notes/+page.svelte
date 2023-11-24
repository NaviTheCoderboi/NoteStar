<script lang="ts">
	import NoteDialog from '$lib/components/NoteDialog.svelte';
	import Plus from '$lib/components/icons/plus.svelte';
	import Sad from '$lib/components/icons/sad.svelte';
	import { format } from 'date-fns';
	import type { PageData } from './$types';

	const formatTitle = (title: string, maxLength: number = 50): string => {
		if (title.length > maxLength) {
			const words: string[] = title.split(' ');
			let formattedTitle: string = '';
			let currentLength: number = 0;

			for (const word of words) {
				if (currentLength + word.length + formattedTitle.length > maxLength) {
					break;
				}
				formattedTitle += word + ' ';
				currentLength += word.length;
			}

			return formattedTitle.trim() + '...';
		} else {
			return title;
		}
	};

	const formatDescription = (description: string, maxLength: number = 150): string => {
		if (description.length > maxLength) {
			const words: string[] = description.split(' ');
			let formattedDescription: string = '';
			let currentLength: number = 0;

			for (const word of words) {
				if (currentLength + word.length + formattedDescription.length > maxLength) {
					break;
				}
				formattedDescription += word + ' ';
				currentLength += word.length;
			}

			return formattedDescription.trim() + '...';
		} else {
			return description;
		}
	};

	let open: boolean = false;
	export let data: PageData;
</script>

<main class="min-h-screen bg-slate-800 text-white py-8 px-4">
	<ul class="flex justify-center items-center gap-5">
		<div>
			<div class="flex items-center">
				<button
					class="flex justify-center items-center px-20 py-14 rounded-lg border-2 border-slate-500 hover:border-slate-400 duration-200"
					on:click={() => (open = true)}
				>
					<Plus Class="h-12 text-red-500" />
				</button>
			</div>
			<div class="text-lg font-extralight py-2 text-slate-300">blank</div>
		</div>
	</ul>
	<div
		class="flex flex-col gap-8 w-full px-4 md:p-0 md:w-2/3 mx-auto py-6 border-t-[1.5px] border-t-slate-700"
	>
		<ul class="flex justify-between items-center">
			<li class="text-3xl font-semibold">My notes</li>
			<li />
		</ul>
		{#if data.notes && data.notes.length > 0}
			<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
				{#each data.notes as note}
					<a
						class="h-fit flex flex-col gap-3 rounded-lg p-4 border-2 border-slate-500 hover:scale-[1.02] duration-150"
						href="/notes/{note._id}"
					>
						<div class="text-slate-300 text-sm font-light">
							{format(note.createdAt, 'dd/MM/yyyy')}
						</div>
						<h1 class="text-lg font-semibold">{formatTitle(note.title)}</h1>
						<p class="text-slate-200">
							{formatDescription(note.description)}
						</p>
						<ul class="flex flex-wrap gap-2">
							{#each note.tags as tag}
								<li
									class="border-2 border-slate-500 rounded-md px-2 py-[2px] text-slate-300 text-sm font-light"
								>
									{tag}
								</li>
							{/each}
						</ul>
					</a>
				{/each}
			</ul>
		{:else}
			<div class="h-[50vh] w-full grid place-items-center">
				<div class="flex items-center justify-center gap-5">
					<Sad Class="h-20 w-20" />
					<span class="text-3xl font-semibold"> No notes found </span>
				</div>
			</div>
		{/if}
	</div>
</main>
<NoteDialog bind:open />
