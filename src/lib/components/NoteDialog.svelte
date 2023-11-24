<script lang="ts">
	import Cross from '$lib/components/icons/cross.svelte';

	export let open: boolean;
	let dialog: HTMLDialogElement;

	interface form_data {
		title: string;
		description: string;
		tagInput: string;
		tags: string[];
	}

	let Form_data: form_data = {
		title: '',
		description: '',
		tagInput: '',
		tags: []
	};

	const toggle = () => {
		if (open) {
			Form_data = {
				title: '',
				description: '',
				tagInput: '',
				tags: []
			};
		}
		open = !open;
	};

	const createTag = (
		event: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		if (event.key == 'Enter') {
			if (
				Form_data.tags.length < 6 &&
				Form_data.tagInput != '' &&
				Form_data.tags.includes(Form_data.tagInput) == false
			) {
				event.preventDefault();
				Form_data.tags.push(Form_data.tagInput);
				Form_data.tagInput = '';
			} else {
				alert('You can only add 6 tags and no duplicate tags');
				Form_data.tagInput = '';
			}
		}
	};

	const removeTag = (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => {
		const tag = event.currentTarget.dataset.tag as string;
		Form_data.tags = Form_data.tags.filter((t) => t != tag);
	};

	$: if (dialog && open) dialog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<dialog on:close={toggle} on:click|self={() => dialog.close()} bind:this={dialog}>
	<form
		class="relative flex flex-col gap-5 px-6 py-4 bg-slate-800 text-white"
		on:click|stopPropagation
		method="POST"
		action="?/new"
	>
		<input name="formData" class="hidden" value={JSON.stringify(Form_data)} />
		<h1 class="text-4xl font-medium text-center">New note</h1>
		<div class="inp relative">
			<input class="inp-input" type="text" required={true} bind:value={Form_data.title} />
			<span>title</span>
		</div>
		<div class="inp relative">
			<input
				class="inp-input"
				type="text"
				required={true}
				bind:value={Form_data.description}
			/>
			<span>description</span>
		</div>
		<div class="inp-optional relative">
			<input
				class="inp-optional-input"
				type="text"
				disabled={Form_data.tags.length >= 6}
				bind:value={Form_data.tagInput}
				on:keydown={createTag}
			/>
			<span>tag name</span>
		</div>
		<ul class="flex items-center flex-wrap gap-3 text-slate-300">
			{#each Form_data.tags as tag}
				<li
					class="flex justify-center items-center gap-2 border-2 border-slate-500 rounded-md px-2 py-1"
				>
					{tag}
					<button on:click={removeTag} data-tag={tag} type="button">
						<Cross Class="h-8" />
					</button>
				</li>
			{/each}
		</ul>
		<button
			class={`px-4 py-2 bg-rose-500 text-center rounded-md duration-200 ${
				Form_data.title == '' || Form_data.description == ''
					? 'opacity-50 cursor-not-allowed'
					: ''
			}`}
			type="submit"
			disabled={Form_data.title == '' || Form_data.description == ''}>Create note</button
		>

		<button class="absolute right-5 top-5" type="button" on:click={() => dialog.close()}>
			<Cross Class="h-8" />
		</button>
	</form>
</dialog>

<style>
	dialog {
		min-width: 35vw;
		max-width: 35vw;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: drop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	dialog:not([open]) {
		animation: drop-out 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes drop-in {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes drop-out {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(100%);
		}
	}

	.inp .inp-input,
	.inp-optional .inp-optional-input {
		@apply bg-slate-800 border-2 border-slate-500 text-white text-2xl tracking-tighter outline-none rounded-md p-3 w-full font-extralight font-mono;
		resize: none;
	}

	.inp span,
	.inp-optional span {
		@apply absolute left-0 p-3 pointer-events-none text-2xl text-slate-500 uppercase duration-300 border-none font-mono;
	}

	.inp .inp-input:valid ~ span,
	.inp .inp-input:focus ~ span {
		border-left: 1px solid rgb(244 62 92);
		border-right: 1px solid rgb(244 63 94);
		@apply text-rose-500 translate-x-2 -translate-y-3 text-lg py-0 px-3 bg-slate-800 tracking-wide;
	}

	.inp .inp-input:valid,
	.inp .inp-input:focus {
		border: 1px solid rgb(244 63 94);
	}

	.inp-optional .inp-optional-input:focus ~ span {
		border-left: 1px solid rgb(244 62 92);
		border-right: 1px solid rgb(244 63 94);
		@apply text-rose-500 translate-x-2 -translate-y-3 text-lg py-0 px-3 bg-slate-800 tracking-wide;
	}

	.inp-optional .inp-optional-input:focus {
		border: 1px solid rgb(244 63 94);
	}
</style>
