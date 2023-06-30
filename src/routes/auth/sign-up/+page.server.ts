import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

export const actions: Actions = {
    default: async ({ request }) => {
        const newCredentials = await request.formData()
        // key values to string conversion
        const { email, username, password, confirm_password } = Object.fromEntries(newCredentials) as Record<string, string>
        const picture = "Not Added"

        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6}$/


        if(email.length === 0) return fail(400, { message: "Email is required" })
        if(!emailRegex.test(email)) return fail(400, { message: "Email is format invalid" })

        if(username.length === 0) return fail(400, { message: "Username is required" })
        if(username.length <= 2) return fail(400, { message: "Username must be more than 2 characters" })
        if(!usernameRegex.test(username)) return fail(400, { message: "Username can only contain lowercase, uppercase, numbers and underscores" })

        if (password.length === 0) return fail(400, { message: "Password is required" })
        if (password.length <= 6) return fail(400, { message: "Password must be more than 6 characters" })
        if (!passwordRegex.test(password)) return fail(400, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number and a special character" })
        if (password !== confirm_password) return fail(400, { message: "Passwords do not match" })
        

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
            return fail(400, { message: "This User Already Exists!" })
        }
    }
}
