import {redirect} from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

// REDIRECTING THE USER TO HIS FEED WHENEVER THEY HAVE A ACTIVE SESSION AND TRY TO GO TO SIGN-IN OR SIGN-UP PAGES, SINCE THEY DO NOT NEED TO BE THERE

const goToFeed = () => { 
    throw redirect(302, "http://localhost:5173")
}

export const load: LayoutServerLoad = async ({ locals, url }) => {
    const { session } = await locals.auth.validateUser()
    if (session) {
        switch (url.href) {
            case "http://localhost:5173/auth/sign-up":
                goToFeed()
            case "http://localhost:5173/auth/sign-in":
                goToFeed()
        }
    }
}
