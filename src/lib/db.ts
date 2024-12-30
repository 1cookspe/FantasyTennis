import connectToDatabase from '$lib/mongoose';
import Team from '$lib/models/Team';
import Player from '$lib/models/Player';

export async function getTeams() {
    await connectToDatabase();
    return Team.find({}).exec();
}

export async function getTeamById(id: string) {
    await connectToDatabase();
    return Team.findById(id).exec();
}

export async function createTeam(teamData: { teamName: string; email: string; players: string[] }) {
    await connectToDatabase();

    console.log('on server');
    console.log(teamData);
    console.log('Type of teamData.email:', typeof teamData.email);

    // Create Team document with references to Player documents
    const newTeam = new Team({
        teamName: teamData.teamName,
        email: teamData.email,
        players: teamData.players // Assuming players is an array of player IDs
    });
    console.log('New team:', newTeam);

    return newTeam.save();
}

export async function getPlayers() {
    await connectToDatabase();
    const teams = await Player.find({}).exec();
    return teams;
}

export async function getPlayerById(id: string) {
    await connectToDatabase();
    return Player.findById(id).exec();
}
