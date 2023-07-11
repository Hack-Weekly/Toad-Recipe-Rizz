import type { PageServerLoad } from "./auth/sign-in/$types"
import { client } from "$lib/server/lucia"

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const { session } = await locals.auth.validateUser()
    const response = await fetch("https://recipes.eerieemu.com/api/recipe/?format=json&page=1")
    // load data in a query param, or something idk this is for asam to figure out
    const recipeData: any[] = []
    const defaultRecipes = await response.json()
    const userRecipes = (await client.recipe.findMany({})).forEach(r => recipeData.push(r))
    const defaultRecipesResults = defaultRecipes.results
    for (const recipe of defaultRecipesResults) {
        recipeData.push(recipe)
    }
    if (session) {
        return {
            // userIsLoggedIn: true
            session,
            recipeData,
        }
    } else {
      return { recipeData }
    }

} 
