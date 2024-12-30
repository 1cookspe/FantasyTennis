import { getPlayers, createTeam } from '$lib/db';
import type { PlayerDocument } from '$lib/models/Player';

export async function load() {
	const players: PlayerDocument[] = await getPlayers();
	return { ...JSON.parse(JSON.stringify(players)) };
}

export const actions = {
	// Called when user submits the form ('Submit' button)
	default: async ({ request }: { request: Request }) => {
		const formData = await request.formData();
		const teamName = formData.get('teamName') as string;
		const email = formData.get('email') as string;
		const players = formData.getAll('players') as string[];

		try {
            await createTeam({
                teamName,
                email,
                players
            });
			console.log('Team created successfully');
            return { success: true, message: 'Team created successfully' };
        } catch (error) {
			console.log(error);
            return { success: false, error: 'Failed to create team' };
        }
	}
}
