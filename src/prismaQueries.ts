import { auth, client } from "$lib/server/lucia";

export async function getRecipe (val: string) {
    const recipe = await client.recipe.findUnique({
        where: {
            slug: val,
        },
        select: {
            id: true,
            user_id: true,
            name: true,
            slug: true,
            description: true,
            ingredients: true,
            instructions: true,
            cook_time: true,
            created_at: true,
            updated_at: true,
        }

    })

    return { recipe }
}

// I know 6 params is a lot but it does everything we need
export async function changeUsernameAndPassword (name: string, email: string, password: string, userId: string) {
    try {
        const user = await auth.getUser(userId)
        const profile = await client.profile.findUnique({
            where: {
                id: user.id,
            },
            select: {
                name: true,
            }
        })
        const updatedName = name !== '' ? name : profile?.name;
        const updatedEmail = email !== '' ? email : user.email;
        const updatedUser = await auth.updateUserAttributes(userId, { email: updatedEmail })
        const updateDisplayName = await client.profile.update({ 
            where: { 
                id: updatedUser.id 
            },
            data: {
                name: name,
            }
        })
        console.log("USER ATTRIBUTES CHANGED:", name, email, password)
        if (password.length === 0) return
        await auth.updateKeyPassword("username", user.username, password)
        console.log(user.username)
        console.log("USER PASSWORD CHANGED!")
    } catch (err) {
        console.log("ERROR CHANGING USERNAME OR PASSWORD:", err)
    }
}

export async function getRecipeCategoryIdsValues (arr: any) {
    const categoryNames = await client.category.findMany({
        where: {
            category_id: {
                in: arr.map(r => r.category_id),
            }
        },
        select: {
            name: true,
        }
    })

    return categoryNames
}
