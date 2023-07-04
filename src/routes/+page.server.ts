import type { PageServerLoad } from "./auth/sign-in/$types"

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const { session } = await locals.auth.validateUser()

    // if (session) {
    //     return {
    //         // userIsLoggedIn: true
    //         session
    //     }
    // } else {
    //   const response = await fetch("https://recipes.eerieemu.com/api/recipe/?format=json&page=1")
    //     // load data in a query param, or something idk this is for asam to figure out
    //   return response
    // }
} 
