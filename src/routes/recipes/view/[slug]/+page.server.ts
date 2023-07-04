import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/lucia";
import { getRecipe } from "../../../../prismaQueries";

export const load: PageServerLoad = async ({ params, locals }) => {
    const { recipe } = await getRecipe(params.slug)
    const { session } = await locals.auth.validateUser()
    if (recipe) {
        const recipeCreator = await client.recipe.findUnique({
            where: {
                id: recipe.id,
            },
            select: {
                name: true,
                user: true,
                Recipe_Category: true,
            }
        })

        const categoryNames = await client.category.findMany({
            where: {
                category_id: {
                    in: recipeCreator?.Recipe_Category.map(r => r.category_id)
                }
            },
            select: {
                name: true,
            }
        })

        console.log(categoryNames)
        const data = {
            recipe: {
            recipeCanBeUpdated: true,
            slug: recipe.slug,
            recipe_creator: recipeCreator?.user.username,
            recipe_name: recipe.name,
            cook_time: recipe.cook_time,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            recipe_categories: categoryNames
        }
    }

        console.log(session?.userId, params.slug, recipe)
        if (recipe.user_id === session?.userId) {
            return data
        }


    // returns if the conditional is false
        data.recipe.recipeCanBeUpdated = false
        return data
    }
}

