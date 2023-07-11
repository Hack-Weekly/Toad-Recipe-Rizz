import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getRecipesByCategories } from "../../prismaQuerys/recipes/getRecipes";

export const load: PageServerLoad = async ({ locals, parent }) => {
    const { session } = await locals.auth.validateUser()
    if (!session) {
        throw redirect(302, "http://localhost:5173")
    }

    // load recipes from users, amar has the api connected in seperate branch we can merge later
    const userCategories = (await parent()).userCategories
    const categoryIds = userCategories?.map((userCategory) => userCategory.category.category_id);

    const getRecipes = await getRecipesByCategories(categoryIds) 

    if (getRecipes.length > 0) {
        return { getRecipes }
    } else {

        return { message: "You Do Not Follow Any Categories!" }
    }
}
