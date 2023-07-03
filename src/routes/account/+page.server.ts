import { redirect } from "@sveltejs/kit";
import { v2 as cloudinary } from "cloudinary"
import type { Actions } from "./$types";
import { client } from "$lib/server/lucia";
import type { PageServerLoad } from "./$types";
import { changeUsernameAndPassword } from "../../prismaQueries";
import { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_KEY, VITE_CLOUDINARY_SECRET } from "$env/static/private"

export const load: PageServerLoad = async ({ locals, parent }) => {
    const { session } = await locals.auth.validateUser()

    if (!session) throw redirect(302, "http://localhost:5173/auth/sign-up") // redirect user to sign-up if user tries to view profile

    const getUserProfile = await client.authUser.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            picture: true
        }
    })

    const defaultAvatar = "https://i.ibb.co/5Gx5mc7/338178321-880290966603246-34525312457264604-n.jpg"
    return {
        userPicture: getUserProfile?.picture ?? defaultAvatar
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { session } = await locals.auth.validateUser()
        if (!session) {
            throw redirect(302, "http://localhost:5173")
        }

        const account = await request.formData()
        const { username, email, password } = Object.fromEntries(account) as Record<string, string>
        const picture = account.get('picture') as File
        await changeUsernameAndPassword(username, email, password, session.userId)

        if (picture) {
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
        // THIS IS BIONIC THIS SHIT DOESNT WORK FOR ME IDK WHY ITS NOT BEING PUSHED TO DB LOL.
        const arrayBuffer = await picture.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer)

        const upload = cloudinary.uploader.upload_stream({
            resource_type: "image",
            folder: "accounts",
            public_id: session.userId,
            overwrite: true,
        },
        async (err, result) => {
            const storePictureUrl = await client.authUser.update({
                where: {
                    id: session.userId
                },
                data: {
                    picture: result?.secure_url
                }
            })
            console.log(result, err)
        }).end(buffer)

        console.log(upload, buffer)
    }
    }
}


