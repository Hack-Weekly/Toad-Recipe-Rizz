import { auth } from "$lib/server/lucia";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (session) throw redirect(302, "http://localhost:5173/feed")
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const loginCredentials = await request.formData()
        const { username, password } = Object.fromEntries(loginCredentials) as Record<string, string>
        try {
          const key = auth.useKey("username", username, password)
          const session = await auth.createSession((await key).userId)
          locals.auth.setSession(session)
        } catch (err) {
            console.log(err)
            return fail(400, { message: "Invalid Credentials Or User Does Not Exists Try Again!" })
        }
    } 
}
