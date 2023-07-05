import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/lucia";
import { getRecipe, getRecipeCategoryIdsValues } from "../../../../prismaQueries";

export const load: PageServerLoad = async ({ params, locals, fetch }) => {
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
                picture: true,
                Recipe_Category: true,
            }
        })
        const categoryNames = await getRecipeCategoryIdsValues(recipeCreator?.Recipe_Category)

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
            recipe_categories: categoryNames,
            picture: recipeCreator?.picture,
            sendingFromSecondaryApi: false,
        }
    }
        if (recipe.user_id === session?.userId) {
            return data
        }


    // returns if the conditional is false
        data.recipe.recipeCanBeUpdated = false
        return data
    } else {
        const response = await fetch(`https://recipes.eerieemu.com/api/recipe/?slug=${params.slug}`)
        const recipe = await response.json()

        const ids = await getRecipeCategoryIdsValues(recipe.results[0].categories)
        console.log(recipe.results[0].categories)
        let categoryNamesTrue = true

        if (recipe.results[0].categories.length > 0) {
            categoryNamesTrue = false 
        }

        const data = {
            recipe: {
            recipeCanBeUpdated: false,
            slug: recipe.results[0].slug,
            recipe_creator: recipe.results[0].author,
            recipe_name: recipe.results[0].name,
            cook_time: recipe.results[0].total_time_string,
            description: recipe.results[0].description,
            ingredients: recipe.results[0].ingredients,
            instructions: recipe.results[0].instructions,
            recipe_categories: ids,
            picture: recipe.results[0].image_path,
            categoryNamesTrue: categoryNamesTrue,
            sendingFromSecondaryApi: true,
            }
        }
        console.log(data)
        return data
    }
}

