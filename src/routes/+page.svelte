<script lang="ts">
	let { data } = $props();
    const teams = data.teams;
    const scores = data.scores;
    console.log(scores);
</script>

<h1>Standings</h1>
<div class="flex items-center space-x-2">
    <p>Don't have a team yet?</p>
    <a href="/create-team" class="bg-blue-500 text-white px-4 py-2 rounded">Create Team</a>
</div>

<table class="min-w-full divide-y divide-gray-200 mt-4">
    <thead class="bg-gray-50">
        <tr>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Team Score</th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
        {#each teams as team, index}
            <tr>
                <td class="px-4 py-2 text-center">{team.teamName}</td>
                <td class="px-4 py-2 text-center">{scores[index]}</td>
            </tr>
        {/each}
    </tbody>
</table>
