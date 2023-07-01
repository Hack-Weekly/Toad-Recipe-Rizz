import { redirect, fail } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"
import { client } from "$lib/server/lucia"
/* Possible Spaghetti That Fuffils Its Purpose, Written With Much Love By: Bionic <3 */

export const load: PageServerLoad = async ({ locals, params }) => {
    const { session } = await locals.auth.validateUser()

    if (session) {
        const getUserProfile = await client.profile.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            name: true,
            slug: true,
            id: true,
        }
      })

    const getUserInfo = await client.authUser.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            username: true,
            picture: true,
        }
    })

    // If profile with slug is equal to the param slug then return profile values.
    console.log(getUserInfo, getUserProfile)
    if (getUserProfile?.slug === params.slug) {
        return {
            name: getUserProfile.name,
            username: getUserInfo?.username,
            userPicture: getUserInfo?.picture
        }
    } else {
    throw redirect(308, `http://localhost:5173/profile/${getUserProfile?.slug}`) // http code 308 makes sense I think, but change if not.
    }
  } else throw redirect(302, "http://localhost:5173/auth/sign-up") // redirect user to sign-up if user tries to view profile
}

/* TODO MAYBE ADD DEFAULT VALUES IF THE LENGTH OF THE ROWS IM TRYING TO UPDATA ARE 0 OR EMPTY */

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { session } = await locals.auth.validateUser()
        if (session) {
            try {
                const updatedFormData = await request.formData()
                const { name, imageUrl } = Object.fromEntries(updatedFormData) as Record<string, string>
                const userId = session.userId

                const updateUser = await client.authUser.update({
                    where: {
                        id: userId
                    },
                    data: {
                        picture: imageUrl
                    }
                })

                const updateProfile = await client.profile.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        name: name
                    }
                })

                console.log("SUCCESFULLY UPDATED USER AND PROFILE")
            } catch (err) {
                console.log(err)
                throw fail(400, { message: "Request To Update Failed!" }) 
            }
        }

    }
}
