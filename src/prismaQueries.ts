import { auth, client } from "$lib/server/lucia";

export async function getRecipe (val: string) {
    return await client.recipe.findUnique({
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
}

// I know 6 params is a lot but it does everything we need
export async function changeUsernameAndPassword (username: string, email: string, password: string, userId: string) {
    try {
        const user = await auth.getUser(userId)
        const updatedUsername = username !== '' ? username : user.username;
        const updatedEmail = email !== '' ? email : user.email;
        const updatedUser = await auth.updateUserAttributes(userId, { username: updatedUsername, email: updatedEmail })
        console.log("USER ATTRIBUTES CHANGED:", username, email, password)
        if (password.length === 0) return
        await auth.updateKeyPassword("username", user.username, null)
        console.log(user.username)
        console.log("USER PASSWORD CHANGED!")
    } catch (err) {
        console.log("ERROR CHANGING USERNAME OR PASSWORD:", err)
    }
}
