import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

export const actions: Actions = {
    default: async ({ request }) => {
        const newCredentials = await request.formData()
        // key values to string conversion
        const { email, username, password, confirm_password } = Object.fromEntries(newCredentials) as Record<string, string>
        const picture = "Not Added"

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const usernameRegex = /^[a-zA-Z0-9_]+$/
        let uppercase: Boolean = false
        let number: Boolean = false

        if(email.length === 0) return fail(400, { message: "Email is required" })
        if(!emailRegex.test(email)) return fail(400, { message: "Email is format invalid" })

        if(username.length === 0) return fail(400, { message: "Username is required" })
        if(username.length <= 2) return fail(400, { message: "Username must be more than 2 characters" })
        if(!usernameRegex.test(username)) return fail(400, { message: "Username can only contain lowercase, uppercase, numbers and underscores" })

        if (password.length === 0) return fail(400, { message: "Password is required" })
        if (password.length <= 6) return fail(400, { message: "Password must be more than 6 characters" })
        //#TODO: Add password strength checker
        for(let i = 0; i < password.length; i++) {
            if(password[i] === " ") return fail(400, { message: "Password cannot contain spaces" })

            if (password[i] === password[i].toUpperCase()) {
                uppercase = true;
            }
            if (!isNaN(parseInt(password[i]))) {
                console.log(password[i])
                number = true;
            }
        }
        if (!uppercase) return fail(400, { message: "Password must contain at least one uppercase character" });
        if (!number) return fail(400, { message: "Password must contain at least one number" });

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
