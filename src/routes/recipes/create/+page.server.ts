import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { client } from "$lib/server/lucia";
import { v2 as cloudinary } from "cloudinary"
import { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_KEY, VITE_CLOUDINARY_SECRET } from "$env/static/private"

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser()
    if (!session) {
        throw redirect(302, "http://localhost:5173")
    }
    const categories = await client.category.findMany({
        select: {
        category_id: true,
        name: true,
        }
    })

    return { categories }
}

// Wrap Inner Logic In Try/Catch Later.
export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { session } = await locals.auth.validateUser()
        const recipeData = await request.formData()
        const { recipeName, description, cookTime, instructions, categories, ingredients } = Object.fromEntries(recipeData) as Record<string, string>
        const recipeThumbnail = recipeData.get('recipeThumbnail') as File
        const specialCharacters = '[`!@#$%^&*()_+=[]{};\':"\\|,.<>/?~]/'.split("")
        let recipeNameSlug = recipeName.split("")
        for (const recipeNameChar of recipeNameSlug) {
         const isTrue = specialCharacters.some(char => char === recipeNameChar)
            if (isTrue) {
                const specialCharIndex = recipeNameSlug.indexOf(recipeNameChar)
                console.log(specialCharIndex)
                console.log(recipeNameChar)
                if (recipeNameChar == "_") {
                   recipeNameSlug[specialCharIndex] = "-"
                } else recipeNameSlug[specialCharIndex] = ""
            }
        }
        const recipeSlug = recipeNameSlug.join("").trim()
        const ingredientArr = ingredients.split(",")
        const categoriesArr = categories.split(",")
        const categoriesIdArr: any [] = []
        for (const categoryName of categoriesArr) {
          const category = await client.category.findFirst({
                where: {
                    name: categoryName.trim(),
                },
                select: {
                    category_id: true,
                }
            })

            categoriesIdArr.push(category?.category_id)
            }
        if (recipeThumbnail) {
        const con = cloudinary.config({
            cloud_name: VITE_CLOUDINARY_CLOUD_NAME,
            api_key: VITE_CLOUDINARY_KEY,
            api_secret: VITE_CLOUDINARY_SECRET,
            secure: true
        });

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        const arrayBuffer = await recipeThumbnail.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer)
        const upload = cloudinary.uploader.upload_stream({
            resource_type: "image",
            folder: "recipes",
            public_id: session?.userId,
            overwrite: true,
        },
        async (err, result) => { 
            const createRecipe = await client.recipe.create({
                data: {
                    name: recipeName,
                    user_id: session?.userId,
                    description: description,
                    ingredients: { ingredients: ingredientArr },
                    instructions: { instructions: instructions },
                    cook_time: cookTime,
                    slug: recipeSlug,
                    picture: result?.secure_url || "",
                }
            })

        // I know its fucking scuffed please forgive lord of code :(
        const selectRecipe = await client.recipe.findFirst({
              where: {
                slug: recipeSlug,
              },
              select: {
                id: true,
                name: true,
              },
          })
    for (const categoryId of categoriesIdArr) {
      const createRecipeCategory = await client.recipe_Category.create({
        data: {
            category_id: categoryId,
            recipe_id: selectRecipe?.id,
        },
      })
    }

        }).end(buffer) 
        console.log(`${recipeName} Created!`)
    }
}}
