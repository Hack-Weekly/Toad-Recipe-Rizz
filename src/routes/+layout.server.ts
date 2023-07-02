// What ammar wanted me to implement, checks if user is active in session and sends data to the client files.
import type { LayoutServerLoad } from "./$types"
import { auth } from "$lib/server/lucia"
export const load: LayoutServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (session) {
      const user = await auth.getUser(session.userId)
    //   console.log(user)
        return {
            userIsLoggedIn: true,
            userId: user.id,
            username: user.username,
            email: user.email,
            picture: user.picture
        }
    }
}
