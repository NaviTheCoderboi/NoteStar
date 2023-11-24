<script lang="ts">
	import Logo from '$lib/assets/logo.png';
	import { signOut } from '@auth/sveltekit/client';
</script>

<nav
	class="sticky top-0 flex justify-between items-center px-8 md:px-20 py-4 bg-slate-800 shadow-md text-rose-500 z-40 border-b-2 border-b-slate-700"
>
	<ul class="flex justify-center items-center gap-5">
		<div class="h-20 w-20">
			<img src={Logo} alt={'logo'} class="object-contain" />
		</div>
		<a href="/" class="hidden md:inline text-4xl font-bold">NoteStar</a>
	</ul>
	<ul class="flex justify-center items-center gap-5">
		<button
			class="bg-rose-500 text-white px-6 py-3 text-xl font-medium rounded-xl hover:brightness-125 duration-200"
			on:click|preventDefault={() =>
				signOut({
					callbackUrl: '/',
					redirect: true
				})}
		>
			Sign out
		</button>
	</ul>
</nav>
