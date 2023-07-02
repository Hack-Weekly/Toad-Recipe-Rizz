// ITS FUCKING SCUFFED I KNOW BUT IM SO TIRED!!!
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { client } from '$lib/server/lucia';

export const GET: RequestHandler = async ({ params, locals }) => {
    const { session } = await locals.auth.validateUser();
    if (!session) throw redirect(307, '/auth/sign-up');
    await client.recipe.delete({
        where: {
            slug: params.slug,
        }
    })
    console.log("ASDASDASD")

    const user = await client.authUser.findUnique({ where: { id: session.userId }, select: { username: true } })

    console.log(`Recipe ${params.slug} Removed!`)
    throw redirect(307, `http://localhost:5173/profile/${user?.username}/myrecipes`);
};
