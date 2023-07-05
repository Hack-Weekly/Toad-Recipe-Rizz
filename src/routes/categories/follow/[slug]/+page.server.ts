import { redirect, type ServerLoad } from "@sveltejs/kit";
import { client } from "$lib/server/lucia";

export const load: ServerLoad = async ({ locals, params }) => {
    const { session } =  await locals.auth.validateUser()

    if (!session) throw redirect(302, "http://localhost:5173")
    // params.slug will pull the category id

    const category = await client.category.findFirst({
        where: {
            name: params.slug,
        },
        select: {
            category_id: true,
        }
    })

    const userId = session?.userId
    console.log(userId)
    await client.user_Category.create({
        data: {
            category_id: category?.category_id,
            user_id: userId,
        },
    })
    console.log("Category Added")
    throw redirect(302, "http://localhost:5173/feed")
}
