import { getTeams, getPlayerById } from '$lib/db';

// Define the enum for the rounds and their corresponding points
enum RoundPoints {
	'1R' = 1,
	'2R' = 2,
	'3R' = 3,
	'4R' = 4,
	'QF' = 5,
	'SF' = 6,
	'F' = 7,
	'W' = 8
}

// Extend the Team type to include the teamScore field
// interface Team {
//     _id: string;
//     teamName: string;
//     email: string;
//     players: string[];
//     teamScore: number; // Optional field
// }

export async function load() {
	// Need to load all teams here
	const teams = await getTeams();

	// Loop through each team and calculate the score from each player
	const numTeams = teams.length;
	var teamScores: number[] = [];
	for (var i = 0; i < numTeams; i++) {
		const team = teams[i];
		const players = team.players;
		// Loop through the players and get each player
		var teamScore = 0;
		for (var j = 0; j < players.length; j++) {
			const playerData = await getPlayerById(players[j]);
			// get the round for player
			const playerRound = playerData.round as keyof typeof RoundPoints;
			const playerPoints = RoundPoints[playerRound] || 0; // Default to 0 if round is not found
			teamScore += playerPoints;
		}
		teamScores.push(teamScore);
	}
	console.log(teams);
	console.log(teamScores);
	// Sort the teams by score
	var sortedIndices = new Array(numTeams);
	for (var i = 0; i < numTeams; ++i) sortedIndices[i] = i;
	sortedIndices.sort(function (a: number, b: number): number { return teamScores[a] > teamScores[b] ? -1 : teamScores[a] < teamScores[b] ? 1 : 0; });
	console.log(sortedIndices);

	// Create a sortedTeams array
	var sortedTeams = [];
	for (var i = 0; i < numTeams; i++) {
		sortedTeams.push(teams[sortedIndices[i]]);
	}
	console.log(sortedTeams);

	const sortedScores = sortedIndices.map(index => teamScores[index]);
    console.log(sortedScores);

	// Return the sortedTeams array along with the sorted scores
	// so that we know how many points each team has
	const response = { teams: sortedTeams, scores: sortedScores };
	return { ...JSON.parse(JSON.stringify(response)) };
}
