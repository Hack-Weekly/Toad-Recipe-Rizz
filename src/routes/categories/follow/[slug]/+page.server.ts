import { redirect } from "@sveltejs/kit";
import { client } from "$lib/server/lucia";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params, parent }) => {
    const { session } =  await locals.auth.validateUser()

    if (!session) throw redirect(302, "/")
    // params.slug will pull the category id

    const category = await client.category.findFirst({
        where: {
            name: params.slug,
        },
        select: {
            category_id: true,
        }
    })
    const currentUserCategories = (await parent()).userCategories
    currentUserCategories?.forEach(userCategory => {
        if (userCategory.category.category_id === category?.category_id) {
            throw redirect(302, "/")
        }
    })
    const userId = session?.userId
    await client.user_Category.create({
        data: {
            category_id: category?.category_id,
            user_id: userId,
        },
    })
    console.log("Category Added")
    throw redirect(302, `/profile/${(await parent()).username}`)
}
