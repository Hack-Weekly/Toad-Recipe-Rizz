// What ammar wanted me to implement, checks if user is active in session and sends data to the client files.
import type { LayoutServerLoad } from "./$types"
import { auth } from "$lib/server/lucia"
import { getUserInfo } from "../prismaQuerys/auth/user"
export const load: LayoutServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (session) {
      const user = await getUserInfo(session.userId)
        return {
            userIsLoggedIn: true,
            userId: user?.id,
            username: user?.username,
            email: user?.email,
            picture: user?.picture,
            userProfile: user?.Profile,
            userRecipes: user?.Recipe,
            userCategories: user?.User_Category
        }
    }
}
