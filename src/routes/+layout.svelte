<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { navigating } from "$app/state";
</script>

{#if navigating.to}
	<div
		class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-100"
	>
		<svg
			class="animate-spin h-10 w-10 text-blue-500"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				class="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="4"
			></circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
			></path>
		</svg>
	</div>
{/if}

<nav class="flex justify-between items-center p-4 bg-gray-100">
	<h1 class="text-xl font-bold">Aussie Open Fantasy Tennis</h1>
	<div class="flex space-x-4">
		<a href="/" class="bg-blue-500 text-white px-4 py-2 rounded">Home</a>
		<a href="/create-team" class="bg-blue-500 text-white px-4 py-2 rounded"
			>Create Team</a
		>
		<a href="/standings" class="bg-blue-500 text-white px-4 py-2 rounded"
			>View Standings</a
		>
		<a href="/rosters" class="bg-blue-500 text-white px-4 py-2 rounded"
			>View Rosters</a
		>
	</div>
</nav>

{@render children()}
