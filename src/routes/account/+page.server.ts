import { redirect } from "@sveltejs/kit";
import { v2 as cloudinary } from 'cloudinary'
import type { Actions } from "./$types";
import { client } from "$lib/server/lucia";
import type { PageServerLoad } from "./$types";
import { writeFile } from 'fs/promises';
import console from "console";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { session } = await locals.auth.validateUser()
        if (!session) {
            throw redirect(302, "http://localhost:5173")
        }

        const account = await request.formData()
        // const { picture } = Object.fromEntries(account) as Record<string, string>
        const picture = (await account).get('picture') as File

        const con = cloudinary.config({
            cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
            api_key: import.meta.env.VITE_CLOUDINARY_KEY,
            api_secret: import.meta.env.VITE_CLOUDINARY_SECRET,
            secure: true
        });

        console.log(con)

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        const arrayBuffer = await picture.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer) 

        const upload = await cloudinary.uploader.upload_stream({
            resource_type: "image",
            folder: "accounts",
            public_id: session.userId,
            overwrite: true,
        }).end(buffer)

        const picUrl = import.meta.env.VITE_CLOUDINARY_RETREIVE_IMG_URL + session.userId

        const storePictureUrl = await client.authUser.update({
            where: {
                id: session.userId
            },
            data: {
                picture: picUrl
            }
        })

        console.log(picUrl);
        console.log(storePictureUrl)
    }
}
