<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	let progress: number = 0;

	const finish = () => {
		progress = 0.1111;
		setTimeout(() => {
			progress = 40;
		}, 100);
		setTimeout(() => {
			progress = 100;
		}, 300);
		setTimeout(() => {
			progress = 0;
		}, 800);
	};

	afterNavigate(finish);

	export let color: string;
</script>

<div id="progress" class="absolute top-0 left-0 w-full h-[4px] z-50">
	{#if progress !== 0}
		<div
			id="progress-bar"
			class={`h-full duration-300 ${color}`}
			style="width:{progress.toString() + '%'}"
		/>
	{/if}
</div>
