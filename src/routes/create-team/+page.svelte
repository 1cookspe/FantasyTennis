<script lang="ts">
	import SelectPlayers from "$lib/components/SelectPlayers.svelte";
	// Get data from the players store (through +page.server.ts)
	let { data, form } = $props();
	// Store selectedPlayers in state

	// Create arrays for men's and women's players
	var mensPlayers = [];
	var womensPlayers = [];

	// Loop through each player and sort by draw (M or W) and ranking
	let players = Object.values(data);
	const mens_1_8 = players.filter(
		(player) =>
			player.draw === "M" && player.ranking >= 1 && player.ranking <= 8,
	);
	const womens_1_8 = players.filter(
		(player) =>
			player.draw === "W" && player.ranking >= 1 && player.ranking <= 8,
	);
	const mens_9_16 = players.filter(
		(player) =>
			player.draw === "M" && player.ranking >= 9 && player.ranking <= 16,
	);
	const womens_9_16 = players.filter(
		(player) =>
			player.draw === "W" && player.ranking >= 9 && player.ranking <= 16,
	);
	const mens_17_32 = players.filter(
		(player) =>
			player.draw === "M" && player.ranking >= 17 && player.ranking <= 32,
	);
	const womens_17_32 = players.filter(
		(player) =>
			player.draw === "W" && player.ranking >= 17 && player.ranking <= 32,
	);

	players.forEach((player) => {
		if (player.draw === "M") {
			mensPlayers.push(player);
		} else {
			womensPlayers.push(player);
		}
	});
</script>

<div class="p-4">
	<p>Create team!</p>

	<form method="POST" class="mt-4 space-y-4">
		<div class="flex items-center space-x-4">
			<label for="name" class="block text-sm font-medium text-gray-700"
				>Team Name (PUNS ARE ENCOURAGED!)</label
			>
			<input
				type="text"
				id="teamName"
				name="teamName"
				required
				class="mt-1 block flex-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700"
				>Email</label
			>
			<input
				type="email"
				id="email"
				name="email"
				required
				class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>
		{#if form?.error}
			<p class="text-red-500">{form.error}</p>
		{/if}
		<SelectPlayers
			players={mens_1_8}
			drawLabel="men"
			lowRank="1"
			highRank="8"
		/>
		<SelectPlayers
			players={womens_1_8}
			drawLabel="women"
			lowRank="1"
			highRank="8"
		/>
		<SelectPlayers
			players={mens_9_16}
			drawLabel="men"
			lowRank="9"
			highRank="16"
		/>
		<SelectPlayers
			players={womens_9_16}
			drawLabel="women"
			lowRank="9"
			highRank="16"
		/>
		<SelectPlayers
			players={mens_17_32}
			drawLabel="men"
			lowRank="17"
			highRank="32"
		/>
		<SelectPlayers
			players={womens_17_32}
			drawLabel="women"
			lowRank="17"
			highRank="32"
		/>
		<!-- Allow user to check 2 players using checkboxes -->
		<!-- <h2 class="text-lg font-semibold">Select 2 men's players ranked between 1 and 8:</h2>
	{#each players as player}
		<label>
			<input
				type="checkbox"
				name="players"
				value={player._id}
			/>
			{player.name}
		</label>
	{/each} -->
		<button
			type="submit"
			class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>Create</button
		>
	</form>
</div>
