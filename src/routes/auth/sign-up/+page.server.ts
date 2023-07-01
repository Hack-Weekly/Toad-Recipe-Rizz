import { redirect, type Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { auth, client } from "$lib/server/lucia";
import type { PageServerLoad } from "./$types";
import md5 from 'md5';

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    console.log(session)
    if (session) throw redirect(302, "http://localhost:5173/feed")
}

export const actions: Actions = {
    default: async ({ request }) => {
        const newCredentials = await request.formData()
        // key values to string conversion
        const { email, username, password } = Object.fromEntries(newCredentials) as Record<string, string>
        if (password.length === 0 || username.length === 0 || email.length === 0) {
              return fail(400, { message: "Form Has Not Been Filled!" })
        }

        try {
          // MD5 hash for gravatar default user picture 
          const hashedEmail = md5(email.toLowerCase().trim())
          const picture = `https://www.gravatar.com/avatar/${hashedEmail}`

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
          console.log(`USER ${user.username} CREATED!`)

          const profileNameArr = email.split("")
          const profileName = profileNameArr.splice(0, profileNameArr.indexOf("@")).join("")
          // Creating Profile Model, Or Row
          const profile = await client.authUser.update({
            where: {
                id: user.id,
            },
            data: {
                Profile: {
                  create: {
                     id: user.id,
                     name: profileName,
                     slug: profileName,
                  }
                }
            }
        })
        } catch (err) {
            console.log("ERROR:", err)
            return fail(400, { message: "This User Already Exists!" })
        }
    }
}
