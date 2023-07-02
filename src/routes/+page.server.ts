import type { PageServerLoad } from "./auth/sign-in/$types"

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()

    if (session) {
        return {
            // userIsLoggedIn: true
            session
        }
    }
} 