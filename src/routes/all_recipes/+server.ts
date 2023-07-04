import { client } from "$lib/server/lucia";
import type { RequestHandler } from "./$types";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request }) => {
//   let { categories } = await request.json();

    const all_recipes = await client.recipe.findMany({})

    console.log(all_recipes)

    return new Response(JSON.stringify(all_recipes), {
        headers: { 'Content-Type': 'application/json' }
    });

//   categories = await Promise.all(
//     categories.map(async (el: Number) => {
//       const categoryName = await client.category.findFirst({
//         where: {
//           id: String(el),
//         },
//         select: {
//           name: true,
//         },
//       });
//       return categoryName;
//     })
//   );
};
