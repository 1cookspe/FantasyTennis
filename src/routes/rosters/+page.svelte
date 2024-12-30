<script lang="ts">
    let { data } = $props();
    let selectedTeam = $state("Select Team");
    let teamDetails: any = $state(null);
    let teams = Object.values(data);
	console.log(teams);

    async function handleChange(event: Event) {
		console.log((event.target as HTMLSelectElement).value);
		// console.log((event.target as HTMLSelectElement).id);
        const selectedTeamId = (event.target as HTMLSelectElement).value;
		// console.log('selectedTeamId = ' + selectedTeamId);
        // selectedTeam = selectedTeamId;
		// console.log(selectedTeam);

        try {
            const response = await fetch(`/rosters?teamId=${selectedTeamId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Team details:', data);
            teamDetails = data;
        } catch (error) {
            console.error('Error fetching team details:', error);
            teamDetails = null;
        }
    }
</script>

<h1>Rosters</h1>

<!-- Create dropdown with each team name -->
<p>Select Team:</p>
<select bind:value={selectedTeam} onchange={handleChange}>
    {#each teams as team}
        <option value={team.id}>{team.name}</option>
    {/each}
</select>

<!-- <Button class="bg-black text-white">{selectedTeam}</Button>
<Dropdown>
	{#each teams as team}
		<DropdownItem id={team.id} value={team.name} on:click={handleChange}>{team.name}</DropdownItem>
	{/each}
</Dropdown> -->

<!-- {#if teamDetails}
    <h2>Team Details</h2>
    <p><strong>Team Name:</strong> {teamDetails.teamName}</p>
    <p><strong>Email:</strong> {teamDetails.email}</p>
    <p><strong>Players:</strong></p>
    <ul>
        {#each teamDetails.players as player}
            <li>{player}</li>
        {/each}
    </ul>
{:else}
    <p></p>
{/if} -->

{#if teamDetails}
	<table class="table-auto
		border-collapse w-full">
		<thead>
			<tr>
				<th class="px-4 py-2">Name</th>
				<th class="px-4 py-2">Round</th>
				<th class="px-4 py-2">Status</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
			{#each teamDetails.players as player}
				<tr class={player.eliminated ? 'bg-red-500 text-white' : ''}>
					<td class="px-4 py-2 text-center">{player.name}</td>
					<td class="px-4 py-2 text-center">{player.round}</td>
					<td class="px-4 py-2 text-center">{player.eliminated ? 'Eliminated' : 'Active'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
