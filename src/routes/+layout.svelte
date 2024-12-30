<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<nav class="flex justify-between items-center p-4 bg-gray-100">
	<h1 class="text-xl font-bold">Aussie Open Fantasy Tennis</h1>
	<div class="flex space-x-4">
		<a href="/" class="bg-blue-500 text-white px-4 py-2 rounded">Home</a>
		<a href="/create-team" class="bg-blue-500 text-white px-4 py-2 rounded">Create Team</a>
		<a href="/rosters" class="bg-blue-500 text-white px-4 py-2 rounded">View Rosters</a>
	</div>
</nav>

{@render children()}
