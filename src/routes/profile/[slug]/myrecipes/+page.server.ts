import { redirect } from "@sveltejs/kit";
import { client } from "$lib/server/lucia";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (session) {
        const userRecipes = await client.recipe.findMany({
            where: {
                id: session.userId
            },
            select: {
                name: true,
                slug: true,
                created_at: true,
                updated_at: true,
            }
        })

        return {
            userRecipes
        }
    }

    throw redirect(302, "http://localhost:5473/")
}
