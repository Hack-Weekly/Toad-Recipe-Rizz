import { client } from "$lib/server/lucia";
import type { RequestHandler } from "./$types";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
  let { categories } = await request.json();

  categories = await Promise.all(
    categories.map(async (el: Number) => {
      const categoryName = await client.category.findFirst({
        where: {
          id: String(el),
        },
        select: {
          name: true,
        },
      });
      return categoryName;
    })
  );

    return new Response(JSON.stringify(categories), {
        headers: { 'Content-Type': 'application/json' }
    });
};
