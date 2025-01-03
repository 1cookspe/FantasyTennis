import { getTeams } from '$lib/db';

export async function load() {
	// Need to load all teams here
	const teams = await getTeams();

	// Loop through each team and calculate the score from each player
	const numTeams = teams.length;
	var teamScores: number[] = [];
	for (var i = 0; i < numTeams; i++) {
		const team = teams[i];
		teamScores.push(team.score);
	}
	// Sort the teams by score
	var sortedIndices = new Array(numTeams);
	for (var i = 0; i < numTeams; ++i) sortedIndices[i] = i;
	sortedIndices.sort(function (a: number, b: number): number { return teamScores[a] > teamScores[b] ? -1 : teamScores[a] < teamScores[b] ? 1 : 0; });

	// Create a sortedTeams array
	var sortedTeams = [];
	for (var i = 0; i < numTeams; i++) {
		sortedTeams.push(teams[sortedIndices[i]]);
	}

	const sortedScores = sortedIndices.map(index => teamScores[index]);

	// Return the sortedTeams array along with the sorted scores
	// so that we know how many points each team has
	const response = { teams: sortedTeams, scores: sortedScores };
	return { ...JSON.parse(JSON.stringify(response)) };
}
