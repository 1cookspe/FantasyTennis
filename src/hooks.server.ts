// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import connectToDatabase from '$lib/mongoose';

export const handle: Handle = async ({ event, resolve }) => {
    await connectToDatabase();
    return resolve(event);
};
