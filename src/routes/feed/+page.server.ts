import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/lucia";

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (!session) {
        throw redirect(302, "http://localhost:5173")
    }

    // load recipes from users, amar has the api connected in seperate branch we can merge later
    const loadUserCategories = await client.user_Category.findMany({
        where: {
            user_id: session.userId,
        },
        include: { category: true }
    })

    const categoryIds = loadUserCategories.map((userCategory) => userCategory.category.category_id);

    const getRecipes = await client.recipe_Category.findMany({
        where: {
            category_id: {
                in: categoryIds
            }
        },
        select: {
            recipe: true,
            category_id: true,
        }
    })

    if (getRecipes.length > 0) {
        return { getRecipes }
    } else {
        const allRecipes = await client.recipe.findMany({})

        return { allRecipes } 
    }
}
