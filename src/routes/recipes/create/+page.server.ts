import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { client } from "$lib/server/lucia";

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (!session) {
        throw redirect(302, "http://localhost:5173")
    }
}

// Wrap Inner Logic In Try/Catch Later.
export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { session } = await locals.auth.validateUser()
        const recipeData = await request.formData()
        const { recipeName, description, cookTime, recipeThumbnail } = Object.fromEntries(recipeData) as Record<string, string>
        const specialCharacters = '[`!@#$%^&*()_+=[]{};\':"\\|,.<>/?~]/'.split("")
        let recipeNameSlug = recipeName.split("")
        for (const recipeNameChar of recipeNameSlug) {
         const isTrue = specialCharacters.some(char => char === recipeNameChar)
            if (isTrue) {
                const specialCharIndex = recipeNameSlug.indexOf(recipeNameChar)
                console.log(specialCharIndex)
                console.log(recipeNameChar)
                if (recipeNameChar == "_") {
                   recipeNameSlug[specialCharIndex] = "-"
                } else recipeNameSlug[specialCharIndex] = ""
            }
        }
        const recipeSlug = recipeNameSlug.join("").trim()
        console.log(recipeSlug)
           const createRecipe = await client.authUser.update({
            where: {
                id: session?.userId,
            },
            data: {
                Recipe: {
                    create: {
                        name: recipeName,
                        description: description,
                        ingredients: { ingredient: "1", },
                        instructions: { hello: "CHEESE PIZZA", },
                        cook_time: cookTime,
                        picture: recipeThumbnail,
                        slug: recipeSlug,
                        },
                    },
                },
            })

            console.log(`${recipeName} Created!`)
    }
}
