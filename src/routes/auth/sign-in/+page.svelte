<script lang="ts">
    // login aswell
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    export let form: ActionData
</script>
<svelte:head>
    <title>Sign in</title>
</svelte:head>
<section class="relative w-full flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div class="mx-auto max-w-lg text-center">
            <h1 class="text-2xl font-bold sm:text-3xl lg:text-4xl">Sign in to your account!</h1>
            <p class="mt-4 text-gray-500">
                Enter your login information to access delicious recipe recommendations and meals
            </p>
        </div>

        <form method="POST" use:enhance class="mx-auto mb-0 mt-8 max-w-md space-y-4">
            {#if form?.message}
                <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
                    <strong class="block font-medium text-red-800"> Something went wrong </strong>
                    <p class="mt-2 text-sm text-red-700">
                        {form.message}
                    </p>
                </div>
            {/if}
            <div>
                <label for="email" class="sr-only">Email</label>

                <div class="relative">
                    <input type="text" name="username" class="w-full rounded-lg bg-gray-100 border border-gray-100 p-4 pe-12 text-sm shadow-sm" placeholder="Enter a username" />

                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                    </span>
                </div>
            </div>

            <div>
                <label for="password" class="sr-only">Password</label>

                <div class="relative">
                    <input type="password" name="password" class="w-full rounded-lg bg-gray-100 border border-gray-100 p-4 pe-12 text-sm shadow-sm" placeholder="Enter a password" />

                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                        </svg>
                    </span>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600">
                    No account?
                    <a class="underline text-blue-500" href="/auth/sign-up">Sign up</a>
                </p>

                <button type="submit" class="flex items-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-medium text-white">
                    <span>Sign in</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 12l14 0" />
                        <path d="M15 16l4 -4" />
                        <path d="M15 8l4 4" />
                    </svg>
                </button>
            </div>
        </form>
    </div>

    <div class="relative h-full w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
            alt="Welcome"
            src="https://images.unsplash.com/photo-1610440042657-612c34d95e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            class="absolute inset-0 h-full w-full object-cover"
        />
    </div>
</section>
<style>
button svg {
  transition: transform 0.3s ease-in-out;
}

button:hover svg {
  transform: translateX(5px);
}
</style>
