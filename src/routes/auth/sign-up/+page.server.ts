import { redirect, type Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    console.log(session)
    if (session) throw redirect(302, "http://localhost:5173/feed")
}

export const actions: Actions = {
    default: async ({ request, url }) => {
        const newCredentials = await request.formData()
        // key values to string conversion
        const { email, username, password } = Object.fromEntries(newCredentials) as Record<string, string>
        const picture = "Not Added"
 
        if (password.length === 0 || username.length === 0 || email.length === 0) {
              return fail(400, { message: "Form Has Not Been Filled!" })
        }

        try {
          const user =  await auth.createUser({
              primaryKey: {
                  providerId: 'username',
                  providerUserId: username, password
              },
              attributes: {
                  username,
                  email,
                  picture
              }
            })
        }  catch (err) {
            console.log(err, "HI WORLD")
            return fail(400, { message: "This User Already Exists!" })
        }
    }
}
