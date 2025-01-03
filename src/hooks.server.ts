// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import connectToDatabase from '$lib/mongoose';
import schedule from 'node-schedule';
import { getTeams, getPlayerById } from '$lib/db';

export const handle: Handle = async ({ event, resolve }) => {
    await connectToDatabase();
    return resolve(event);
};

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

const job = schedule.scheduleJob('18 * * * *', async function () {
    console.log('Database connection refreshed');
    // Need to load all teams here
    const teams = await getTeams();

    // Loop through each team and calculate the score from each player
    const numTeams = teams.length;
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
        // update team score in the database
        console.log('Team score:', teamScore);
        team.score = teamScore;
        team.save();
    }
});
