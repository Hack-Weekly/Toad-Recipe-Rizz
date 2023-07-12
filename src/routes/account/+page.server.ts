import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { updateName, updateEmail, updatePassword, uploadPicture } from "./updateFunctions";

export const load: PageServerLoad = async ({ locals, parent }) => {
    const { session } = await locals.auth.validateUser()

    if (!session) throw redirect(302, "http://localhost:5173/auth/sign-up") // redirect user to sign-up if user tries to view profile

    const user = (await parent())
    const defaultAvatar = "https://i.ibb.co/5Gx5mc7/338178321-880290966603246-34525312457264604-n.jpg"
    return {
        userPicture: user.picture ?? defaultAvatar,
        profile: {
            name: user.userProfile[0].name ?? "Err",
        }
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const {session} = await locals.auth.validateUser()
        if (!session) throw redirect(302, "http://localhost:5173")

        const userId = session.userId;
        const account = await request.formData()
        const { name, email, password, confirm_password } = Object.fromEntries(account) as Record<string, string>
        const picture = (await account).get('picture') as File

        let msgArray: Array<Object> = []

        if(name) {
            const update = await updateName(name, userId)
            if(update && update.code) msgArray.push({code:update.code, message: update.message})
        }

        if(email) {
            const update = await updateEmail(userId, email)
            if(update && update.code) msgArray.push({code:update.code, message: update.message})
        }

        if(password) {
            const update = await updatePassword(userId, password, confirm_password)
            if(update && update.code) msgArray.push({code:update.code, message: update.message})
        }


        if(picture) {
            const update = await uploadPicture(userId, picture)
            if(update && update.code) msgArray.push({code:update.code, message: update.message})
        }

        const failedUpdates = msgArray.filter(update => update.code === 400);

        if (failedUpdates.length > 0) {
            return fail(400, { message: failedUpdates });
        } else {
            return { code: 200, message: "Updated successfully" };

        }
    }
}
