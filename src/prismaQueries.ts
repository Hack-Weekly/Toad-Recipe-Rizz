import { client } from "$lib/server/lucia";

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
