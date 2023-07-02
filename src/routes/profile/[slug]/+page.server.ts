import { error, fail } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"
import { client } from "$lib/server/lucia"
/* Possible Spaghetti That Fulffils Its Purpose, Written With Much Love By: Bionic <3 */

export const load: PageServerLoad = async ({ params }) => {
    try {
        console.log(params.slug)
        const getUserProfile = await client.profile.findFirst({
            where: {
                slug: params.slug
            },
            select: {
                name: true,
                slug: true,
                id: true,
            }
        })

        const getUserInfo = await client.authUser.findUnique({
            where: {
                id: getUserProfile?.id,
            },
            select: {
                username: true,
                picture: true,
            }
        })
            return {
                name: getUserProfile?.name,
                username: getUserInfo?.username,
                userPicture: getUserInfo?.picture
            }
    } catch (err) {
        console.log(err)
        throw error(404, { message: "Not Found" })
    }

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
