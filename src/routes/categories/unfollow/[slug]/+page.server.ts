import { redirect, type ServerLoad } from "@sveltejs/kit";
import { client } from "$lib/server/lucia";

export const load: ServerLoad = async ({ locals, params }) => {
    const { session } =  await locals.auth.validateUser()

    if (!session) throw redirect(302, "/")
    // params.slug will pull the category id
    
    const category = await client.category.findFirst({
        where: {
            name: params.slug
        },
        select: {
            category_id: true,
        }
    })

    const userCategory = await client.user_Category.findFirst({
        where: {
            user_id: session.userId,
            category_id: category?.category_id
        },
        select: {
            category_id: true,
        }
    })

    const userId = session?.userId
    console.log(userId)
    await client.user_Category.delete({
        where: {
            category_id: userCategory?.category_id,
        }
    })

    console.log("Category Removed!")
    throw redirect(302, "/feed")
}
