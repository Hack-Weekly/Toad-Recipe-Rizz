import {fail, redirect} from "@sveltejs/kit";
import {v2 as cloudinary} from 'cloudinary'
import type {Actions, PageServerLoad} from "./$types";
import {client} from "$lib/server/lucia";

export const load: PageServerLoad = async ({locals, params}) => {
    const {session} = await locals.auth.validateUser()

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
    default: async ({request, locals}) => {
        const {session} = await locals.auth.validateUser()
        if (!session) {
            throw redirect(302, "http://localhost:5173")
        }
        const userId = session.userId;

        const account = await request.formData()
        // const { picture } = Object.fromEntries(account) as Record<string, string>
        const picture = (await account).get('picture') as File
        const username = account.get('username') as string
        const email = account.get('email') as string
        const password = account.get('password') as string

        uploadPicture(userId, picture);
        if (username !== "") updateUsername(userId, username);
        console.log(email)
        if (email !== "") updateEmail(userId, email);
    }
}

async function updateEmail(userId: string, email: string) {
    const valid = validateEmail(email);
    if (valid?.status === 400) return fail(400, {message: "Email invalid"});

    const updatedEmail = await client.authUser.update({
        where: {
            id: userId
        },
        data: {
            email: email
        }
    })
}

function validateEmail(email: string) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(email.length === 0) return fail(400, { message: "Email is required" })
    if(!emailRegex.test(email)) return fail(400, { message: "Email is format invalid" })
}

async function updateUsername(userId: string, username: string) {
    const valid = validateUsername(username);
    if (valid?.status === 400) return fail(400, {message: "Username invalid"});

    const updatedUsername = await client.authUser.update({
        where: {
            id: userId,
        },
        data: {
            username: username
        }
    })
}

function validateUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9_]+$/

    if (username.length === 0) return fail(400, {message: "Username is required"})
    if (username.length <= 2) return fail(400, {message: "Username must be more than 2 characters"})
    if (!usernameRegex.test(username)) return fail(400, {message: "Username can only contain lowercase, uppercase, numbers and underscores"})
}

async function uploadPicture(userId: string, picture: File) {
    const con = cloudinary.config({
        cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        api_key: import.meta.env.VITE_CLOUDINARY_KEY,
        api_secret: import.meta.env.VITE_CLOUDINARY_SECRET,
        secure: true
    });

    // console.log(con)

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
        public_id: userId,
        overwrite: true,
    }, async (err, result) => {
        const storePictureUrl = await client.authUser.update({
            where: {
                id: userId
            },
            data: {
                picture: result?.secure_url
            }
        })
    }).end(buffer)
    // this is unreadable code, i have no idea how to make it more readable

    // console.log(picUrl);
    // console.log(storePictureUrl)
}


