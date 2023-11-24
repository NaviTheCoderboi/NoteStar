<script lang="ts">
	import imports from '$lib/utils/imports';
	import type { OutputData } from '@editorjs/editorjs';
	import { onMount } from 'svelte';

	export let content: OutputData;
	let editor: HTMLDivElement;

	onMount(async () => {
		const Imports = await imports();
		const EditorJS = Imports.EditorJS;
		const newEditor = new EditorJS({
			holder: editor,
			inlineToolbar: true,
			autofocus: true,
			tools: {
				paragraph: {
					class: Imports.Paragraph,
					inlineToolbar: true
				},
				marker: {
					class: Imports.MarkerTool,
					inlineToolbar: true
				},
				header: {
					class: Imports.Header,
					inlineToolbar: true,
					config: {
						placeholder: 'Enter a header',
						levels: [2, 3, 4],
						defaultLevel: 2
					}
				},
				checklist: {
					class: Imports.CheckList,
					inlineToolbar: true
				},
				codebox: {
					class: Imports.CodeBox,
					inlineToolbar: true,
					config: {
						themeURL: '/src/app.css?t=1700655963186',
						useDefaultTheme: 'dark'
					}
				},
				list: {
					class: Imports.List,
					inlineToolbar: true
				},
				delimiter: {
					class: Imports.Delimiter,
					inlineToolbar: true
				},
				embed: {
					class: Imports.Embed,
					inlineToolbar: true,
					config: {
						services: {
							youtube: true,
							coub: true,
							facebook: true,
							instagram: true,
							twitter: true,
							'twitch-video': true,
							miro: true,
							vimeo: true,
							gfycat: true,
							imgur: true,
							vine: true,
							aparat: true,
							'yandex-music-track': true,
							codepen: true,
							pinterest: true,
							github: true
						}
					}
				},
				link: {
					class: Imports.Link,
					inlineToolbar: true
				},
				quote: {
					class: Imports.Quote,
					inlineToolbar: true,
					config: {
						quotePlaceholder: 'Enter a quote',
						captionPlaceholder: "Quote's author"
					}
				},
				table: {
					class: Imports.Table,
					inlineToolbar: true
				}
			},
			data: content,
			onChange: async (api) => {
				content = await api.saver.save();
			}
		});
	});
</script>

<div bind:this={editor} class="w-full" />
