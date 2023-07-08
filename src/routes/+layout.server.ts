// What ammar wanted me to implement, checks if user is active in session and sends data to the client files.
import type { LayoutServerLoad } from "./$types"
import { getUserInfo } from "../prismaQuerys/auth/user"
import { getAllCategories } from "../prismaQuerys/recipes/getRecipes"

export const load: LayoutServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    const categories = await getAllCategories()
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
            userCategories: user?.User_Category,
            categories
        }
    } else return { categories }
}
