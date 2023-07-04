import {fail, redirect} from "@sveltejs/kit";
import {v2 as cloudinary} from 'cloudinary'
import type {Actions, PageServerLoad} from "./$types";
import {auth, client} from "$lib/server/lucia";

export const load: PageServerLoad = async ({ locals, parent }) => {
    const { session } = await locals.auth.validateUser()

    if (!session) throw redirect(302, "http://localhost:5173/auth/sign-up") // redirect user to sign-up if user tries to view profile

    const getUserProfile = await client.authUser.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            picture: true,
            email: true
        }
    })

    const userProfile = await client.profile.findUnique({ 
        where: { 
            id: session.userId
        },
        select: {
            name: true,
        }
    })

    const defaultAvatar = "https://i.ibb.co/5Gx5mc7/338178321-880290966603246-34525312457264604-n.jpg"
    return {
        userPicture: getUserProfile?.picture ?? defaultAvatar,
        profile: userProfile?.name ?? "No name",
    }
}

export const actions: Actions = {
    default: async ({request, locals}) => {
        const {session} = await locals.auth.validateUser()
        if (!session) throw redirect(302, "http://localhost:5173")

        const userId = session.userId;
        const account = await request.formData()
        const { name } = Object.fromEntries(account) as Record<string, string>
        const picture = (await account).get('picture') as File

        if(name) {
            const update = await updateName(name, userId)
            if(update?.code) return fail(update?.code, { message: update.message})
        }

    }
}

const updateName = async (name: string, userId: string) => {

    if(name.length <= 2) return { code: 400, message: "Name must be at least 3 characters long"}
    // Very descriptive name
    const updateTheNameThatTheUserTypedInAndSubmitted = await client.profile.update({ 
        where: { 
            id: userId
        },
        data: {
            name: name,
        }
    })

    return { code: 200, message: "Updated successfully"}
}



