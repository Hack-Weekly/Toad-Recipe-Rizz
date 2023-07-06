import { error, fail } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"
import { client } from "$lib/server/lucia"
import { getUserInfo, getUserProfile } from "../../../prismaQuerys/auth/user"

/* Possible Spaghetti That Fulffils Its Purpose, Written With Much Love By: Bionic <3 */

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        const userProfile = await getUserProfile(params.slug)
        if(userProfile?.id) {
            const userInfo = await getUserInfo(userProfile.id)
            const userRecipes = userInfo?.Recipe
            const getJoinedCategories = userInfo?.User_Category
            let categories:Array<Object> = []

            if(getJoinedCategories) {
                categories = await client.category.findMany({
                    where: {
                        category_id: {
                            in: getJoinedCategories.map((categories) => categories.category.category_id)
                        }
                    },
                    select: {
                        name: true,
                        id: true,
                    }
                })
            }

        return {
            profile: {
                name: userProfile.name,
                username: userInfo?.username,
                slug: userProfile.slug,
                picture: userInfo?.picture,
                created_at: userProfile.created_at,
            },
            recipes: userRecipes,
            categories: categories
        }
    } else {
        throw error(404, { message: "User not found" })
    }
    } catch (err) {
        console.log(err)
        throw error(400, { message: "Request Failed!" })
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
