<script lang="ts">
    let { data } = $props();
    let teamDetails: any = $state(null);
    let isLoading = $state(false);
    let errorFetchingTeam = $state(false);

    // Unpack data from server into teams array
    let teams = Object.values(data);

    // Function to handle when the dropdown is changed so that the team can be fetched
    async function handleChange(event: Event) {
        const selectedTeamId = (event.target as HTMLSelectElement).value;
        isLoading = true;

        try {
            const response = await fetch(`/rosters?teamId=${selectedTeamId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            teamDetails = data;
        } catch (error) {
            console.error("Error fetching team details:", error);
            teamDetails = null;
            errorFetchingTeam = true;
        } finally {
            isLoading = false;
        }
    }
</script>

<!-- Create dropdown with each team name -->
<p>
    Select a team from the dropdown below, and the team's roster will appear
    below.
</p>
<select
    onchange={handleChange}
    class="bg-blue-500 text-white border border-blue-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
>
    <option value="" disabled selected>Select a team</option>
    {#each teams as team}
        <option value={team.id}>{team.name}</option>
    {/each}
</select>

{#if isLoading}
    <!-- Show loading icon when data is being fetched -->
    <div class="mt-4">
        <svg
            class="animate-spin h-5 w-5 text-blue-500"
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
{:else if teamDetails}
    <table
        class="table-auto
		border-collapse w-full"
    >
        <thead>
            <tr>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Round</th>
                <th class="px-4 py-2">Status</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#each teamDetails.players as player}
                <tr class={player.eliminated ? "bg-red-500 text-white" : ""}>
                    <td class="px-4 py-2 text-center">{player.name}</td>
                    <td class="px-4 py-2 text-center">{player.round}</td>
                    <td class="px-4 py-2 text-center"
                        >{player.eliminated ? "Eliminated" : "Active"}</td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
<!-- {/if} -->
{:else if errorFetchingTeam}
    <p class="text-red-500 mt-4">Error fetching team details</p>
{/if}
