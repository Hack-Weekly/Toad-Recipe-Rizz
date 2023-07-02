import type { Actions } from "./$types";
import { client } from "$lib/server/lucia";
import uuid4 from "uuid4";
// Wrap Inner Logic In Try/Catch Later.
export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { session } = await locals.auth.validateUser()
        const recipeData = await request.formData()
        const { recipeName, description, cookTime, picture } = Object.fromEntries(recipeData) as Record<string, string>
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
        const uuid = uuid4()
        // Prisma auto uuid isnt working after the first value it repeats the same value again on insert
        // To get around this issue I will download the uuid4 yarn package to simplify things.
        const createRecipe = await client.authUser.update({
            where: {
                id: session?.userId,
            },
            data: {
                Recipe: {
                    create: {
                        id: session?.userId,
                        recipe_id: uuid,
                        name: recipeName,
                        description: description,
                        ingredients: { ingredient: "1", },
                        instructions: { hello: "CHEESE PIZZA", },
                        cook_time: cookTime,
                        picture: picture,
                        slug: recipeSlug,
                        }
                    }
                }
            })

            console.log(`${recipeName} Created!`)
    }
}
