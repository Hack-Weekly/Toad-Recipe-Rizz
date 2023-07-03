import type { PageServerLoad } from "./$types";
import { redirect, type Actions } from "@sveltejs/kit";
import { getRecipe } from "../../../../../../prismaQueries";
import { client } from "$lib/server/lucia";

export const load: PageServerLoad = async ({ params, parent }) => {
   const recipe = await getRecipe(params.slug)
   const userId = (await parent()).userId
   if (userId !== recipe?.user_id || !userId) throw redirect(302, "http://localhost:5173/auth/sign-in")

   if (recipe) {
        return {
            recipeName: recipe.name,
            description: recipe.description,
            ingredient: recipe.ingredients,
            instructions: recipe.instructions,
            cookTime: recipe.cook_time,
            craeted: recipe.created_at,
            update: recipe.updated_at
        }
   }
}

// Form that updates data just need to fix ui and stuff on client page

export const actions: Actions = {
    default: async ({ request, params }) => {
        const updatedRecipe = await request.formData()
        const { recipeName, description, ingredient, instructions, cookTime, created_at, updated_at } = Object.fromEntries(updatedRecipe) as Record <string, string> 
        await client.recipe.update({
            where: {
                slug: params.slug,
            },
            // ingredients and instructions are JSON data...
            data: {
                name: recipeName,
                description: description,
                ingredients: ingredient,
                instructions: instructions,
                cook_time: cookTime,
                created_at: created_at,
                updated_at: updated_at,
            }
        })
    }
}
