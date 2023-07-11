import { client } from "$lib/server/lucia"

export const getUserProfile = async (slug: string) => await client.profile.findFirst({
    where: {
        slug: slug
    },
    select: {
        name: true,
        slug: true,
        created_at: true,
        id: true,
    }
})

export const getUserInfo = async (profileID: string) => await client.authUser.findUnique({
    where: {
        id: profileID,
    },
    select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        Recipe: true,
        Profile: true,
        User_Category: {
            select: {
                category: true,
            },
        },
        },
})
