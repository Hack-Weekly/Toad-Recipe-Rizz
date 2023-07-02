import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/lucia";


export const load: PageServerLoad = async ({ params }) => {
    const recipe = await client.recipe.findUnique({
        where: {
            slug: params.slug
        },
        select: {
            id: true,
            recipe_id: true,
            name: true,
            description: true,
            ingredients: true,
            instructions: true,
            updated_at: true,
        }
    })

    if (recipe) {
        const recipeCreator = await client.recipe.findUnique({
            where: {
                id: recipe.id,
            },
            select: {
                name: true
            }
        })
        return {
            recipe_creator: recipeCreator?.name, 
            recipe_id: recipe.id,
            recipe_name: recipe.name,
            description: recipe.description,
            ingredient: recipe.ingredients,
            instructions: recipe.instructions,
        }
    }
}
