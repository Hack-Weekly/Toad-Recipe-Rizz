import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/lucia";
import { getRecipe } from "../../../../prismaQueries";

export const load: PageServerLoad = async ({ params, parent }) => {
    const recipe = await getRecipe(params.slug)

    if (recipe) {
        const recipeCreator = await client.recipe.findUnique({
            where: {
                id: recipe.id,
            },
            select: {
                name: true
            }
        })

        if (recipe.user_id === (await parent()).userId) {
            return {
                recipeCanBeUpdated: true,
                slug: recipe.slug,
                recipe_creator: recipeCreator?.name, 
                recipe_name: recipe.name,
                description: recipe.description,
                ingredient: recipe.ingredients,
                instructions: recipe.instructions,
                }
        }
    // returns if the conditional is false
        return {
            recipeCanBeUpdated: false,
            recipe_creator: recipeCreator?.name,
            recipe_name: recipe.name,
            description: recipe.description,
            ingredient: recipe.ingredients,
            instructions: recipe.instructions,
        }
    }
}

