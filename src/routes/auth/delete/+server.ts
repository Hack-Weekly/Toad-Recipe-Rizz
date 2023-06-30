import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/lucia';

export const GET: RequestHandler = async ({ locals }) => {
    const { session } = await locals.auth.validateUser();
    console.log(session)
    if (!session) throw redirect(307, '/auth/sign-up');
    await auth.deleteUser(session.userId); // Delete User
    console.log("User Removed!", session)
    throw redirect(307, '/auth/sign-up');
};
