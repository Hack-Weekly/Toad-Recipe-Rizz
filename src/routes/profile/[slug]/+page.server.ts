import { error, fail } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"
import { client } from "$lib/server/lucia"
/* Possible Spaghetti That Fulffils Its Purpose, Written With Much Love By: Bionic <3 */

export const load: PageServerLoad = async ({ params, parent, locals }) => {
    try {
        const { session } = await locals.auth.validateUser()
        const getUserProfile = await client.profile.findFirst({
            where: {
                slug: params.slug
            },
            select: {
                name: true,
                slug: true,
                created_at: true,
                id: true,
            }
        })

        if(getUserProfile?.id) {

            const userRecipes = await client.recipe.findMany({
                where: {
                    user_id: getUserProfile?.id
                },
                select: {
                    name: true,
                    slug: true,
                    created_at: true,
                    updated_at: true,
                }
            })
            const getJoinedCategories = await client.user_Category.findMany({
                where: {
                    user_id: getUserProfile!.id
                },
                select: {
                    category_id: true
                }
            })
            let categories:Array<Object> = []
            if(getJoinedCategories) {
                categories = await client.category.findMany({
                    where: {
                        id: {
                            in: getJoinedCategories.map((category) => category.category_id)
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
                name: getUserProfile?.name,
                slug: getUserProfile?.slug,
                created_at: getUserProfile?.created_at,
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
