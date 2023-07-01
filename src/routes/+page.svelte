<!-- <h1 class="text-3xl font-bold text-red-500 underline">
    Hello world!
</h1>

<a href="/auth/logout" class="bg-black rounded-md text-white py-2 px-3">Logout</a>

<a href="/auth/delete" class="bg-black rounded-md text-white py-2 px-3">Delete</a> -->

<script>
    import Recipe from '$lib/recipe.svelte';
    import Communities from '$lib/communities.svelte';
    // @ts-ignore
    import ShortRecipe from '$lib/shortRecipe.svelte';
    import Profile from '$lib/profile.svelte';
    import AddRecipe from '$lib/addRecipe.svelte';
</script>  

<section class="center w-full h-screen relative flex justify-start items-center flex-col">

    <div class="account-info min-h-[64px] w-full border-b border-gray-300 h-16 flex justify-between items-center px-4">

        <div class="left-side flex justify-start items-center gap-x-2 text-xs">
            
            <img src="https://i.ibb.co/5Gx5mc7/338178321-880290966603246-34525312457264604-n.jpg" alt="account-pfp" class="w-11 h-11 rounded-full">

            <div class="flex justify-start items-start flex-col">
                <p class="text-gray-500"> shaniayanofc </p>
                <span class="text-gray-400"> shaniayanofc@gmail.com </span>
            </div>

        </div>

        <div class="right-side">

            <button class="py-2 px-4 max-sm:text-xs rounded-md bg-[#121212] text-white"> Create Recipe </button>

        </div>
        
    </div>

    
    <div class="overflow-y-auto mb-6">
        <ShortRecipe  />
        <Recipe  />
        <Communities  />
        <Profile />
        <AddRecipe />
    </div>




    <div class="search w-full p-4 border-t border-gray-300 hidden max-xl:block">
        <div class="search-holder relative flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute right-4 text-black/75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" class="w-full h-11 rounded-full border outline-none border-black/10 bg-gray-100 px-4" placeholder="Search categories...">
        </div>
    </div>

</section>

<section class="end w-96 min-w-[384px] h-full border-l border-gray-300 pt-6 px-4 max-xl:hidden">

    <div class="search">
        <div class="search-holder relative flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute right-4 text-black/75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" class="w-full h-11 rounded-full border outline-none border-black/10 bg-gray-100 px-4" placeholder="Search categories...">
        </div>
    </div>

</section>
