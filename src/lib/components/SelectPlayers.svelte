<script lang="ts">
	let { players, drawLabel, lowRank, highRank } = $props();
</script>

<h2 class="text-lg font-semibold">
	Select two {drawLabel}'s players ranked between {lowRank} and {highRank}:
</h2>
{#each players as player}
    <div>
        <label>
            <input
                type="checkbox"
                name="players"
                value={player._id}
            />
            {player.name} (Ranking: {player.ranking})
        </label>
    </div>
{/each}
