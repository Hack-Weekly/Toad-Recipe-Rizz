import { error, fail } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"
import { client } from "$lib/server/lucia"
/* Possible Spaghetti That Fulffils Its Purpose, Written With Much Love By: Bionic <3 */

export const load: PageServerLoad = async ({ params, parent }) => {
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


    if (session) {
        const getUserProfile = await client.profile.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            name: true,
            slug: true,
            id: true,
            created_at: true
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

        if (getUserProfile?.id ===(await parent()).userId) {
            return {
                isUser: true,
                name: getUserProfile?.name,
                username: getUserInfo?.username,
                userPicture: getUserInfo?.picture,
                userRecipes
            }
        }


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

    // If profile with slug is equal to the param slug then return profile values.
    if (getUserProfile?.slug === params.slug) {
        return {
            profile: {
                id: getUserProfile.id,
                name: getUserProfile.name,
                username: getUserInfo?.username,
                userPicture: getUserInfo?.picture,
                created_at: getUserProfile.created_at
                userRecipes
            },
            categories: categories
        }
    } else {
    throw redirect(308, `http://localhost:5173/profile/${getUserProfile?.slug}`) // http code 308 makes sense I think, but change if not.
         return {
            isUser: false,
            name: getUserProfile?.name,
            username: getUserInfo?.username,
            userPicture: getUserInfo?.picture,
            userRecipes
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
