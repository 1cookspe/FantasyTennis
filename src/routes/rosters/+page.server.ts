import { getTeams } from '$lib/db';

export async function load() {
	// Need to load all teams here
	const teams = await getTeams();
	// We want to get the team names and ids so that we can display them in the dropdown
	const teamNames = teams.map((team) => {
		return {
			name: team.teamName,
			id: team._id
		};
	});
	return { ...JSON.parse(JSON.stringify(teamNames)) };
}
