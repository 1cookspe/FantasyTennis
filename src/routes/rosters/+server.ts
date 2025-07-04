import type { RequestHandler } from '@sveltejs/kit';
import { getTeamById, getPlayerById } from '$lib/db';

export const GET: RequestHandler = async ({ url }) => {
    const teamId = url.searchParams.get('teamId');
    if (!teamId) {
        return new Response(JSON.stringify({ error: 'Team ID is required' }), { status: 400 });
    }

    try {
        const team = await getTeamById(teamId);
		// Get the players associated with the team
		const players = team.players;
		// Get each player by ID
		const playerPromises = players.map((playerId: string) => getPlayerById(playerId));
		const playerDocs = await Promise.all(playerPromises);
		team.players = playerDocs;
        return new Response(JSON.stringify(team), { status: 200 });
    } catch (error) {
		console.log(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch team' }), { status: 500 });
    }
};
