import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { auth } from '$lib/server/lucia';

export const GET: RequestHandler = async ({ locals }) => {
    const { session } = await locals.auth.validateUser();
    if (!session) throw redirect(307, '/auth/sign-in');
    await auth.invalidateSession(session.sessionId); // invalidate session
    locals.auth.setSession(null);
    throw redirect(307, '/auth/sign-in');
};
