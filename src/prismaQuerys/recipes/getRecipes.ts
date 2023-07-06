import { client } from "$lib/server/lucia";

export const getRecipesByCategories = async (categoryIds: number[]) => await client.recipe_Category.findMany({
    where: {
        category_id: {
            in: categoryIds
        }
    },
    select: {
        recipe: true,
        category_id: true,
    }
})
