import { client, auth } from "$lib/server/lucia"
import {v2 as cloudinary} from 'cloudinary'

export const updateName = async (name: string, userId: string) => {

    if(name.length <= 2) return { code: 400, message: "Name must be at least 3 characters long"}

    // Very descriptive name
    const updateTheNameThatTheUserTypedInAndSubmitted = await client.profile.update({ 
        where: { 
            id: userId
        },
        data: {
            name: name,
        }
    })

    return { code: 200, message: "Updated successfully"}
}

export async function updatePassword(userId: string, password: string, confirm_password: string) {
    let uppercase = false;
    let number = false;
    if (!confirm_password) return {code: 400, message: "Password confirmation is required"}
    if (password.length === 0) return {code: 400, message: "Password is required"}
    if (password.length <= 6) return {code: 400, message: "Password must be more than 6 characters"}

    for (let i = 0; i < password.length; i++) {
        if (password[i] === " ") return { code: 400,message: "Password cannot contain spaces"}

        if (password[i] === password[i].toUpperCase()) {
            uppercase = true;
        }
        if (!isNaN(parseInt(password[i]))) {
            console.log(password[i])
            number = true;
        }
    }

    if (!uppercase) return {code: 400, message: "Password must contain at least one uppercase character"};
    if (!number) return {code: 400, message: "Password must contain at least one number"};

    if (password !== confirm_password) return {code: 400, message: "Passwords do not match" }

    const user = await client.authUser.findUnique({
        where: {
            id: userId,
        },
        select: {
            username: true
        }
    })

    if (!user) return {code: 400, message: "User not found"}
    const key = await auth.updateKeyPassword("username", user!.username, password);

    return { code: 200, message: "Updated successfully"}
}

export async function updateEmail(userId: string, email: string) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return { code: 400, message: "Email is format invalid"}

    const updatedEmail = await client.authUser.update({
        where: {
            id: userId
        },
        data: {
            email: email
        }
    })

    return { code: 200, message: "Updated successfully"}
}

export async function uploadPicture(userId: string, picture: File) {
    
    cloudinary.config({
        cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        api_key: import.meta.env.VITE_CLOUDINARY_KEY,
        api_secret: import.meta.env.VITE_CLOUDINARY_SECRET,
        secure: true
    });

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
    
    return { code: 200, message: "Updated successfully"}
    // this is unreadable code, i have no idea how to make it more readable

    // console.log(picUrl);
    // console.log(storePictureUrl)
}
