import { auth } from "$lib/server/lucia";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const loginCredentials = await request.formData()
        const { username, password } = Object.fromEntries(loginCredentials) as Record<string, string>
        try {
            if(username.length === 0) return fail(400, { message: "Username is required" })
            if (password.length === 0) return fail(400, { message: "Password is required" })
            
            const key = auth.useKey("username", username, password)
            const session = await auth.createSession((await key).userId)
            locals.auth.setSession(session)
        } catch (err) {
            return fail(400, { message: "Invalid Credentials Or User Does Not Exists Try Again!" })
        }
    } 
}
