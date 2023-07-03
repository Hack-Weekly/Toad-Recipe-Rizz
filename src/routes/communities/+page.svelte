<script lang="ts">
    // @ts-ignore
    import Community from '$lib/community.svelte';
    import ProfileHeader from '$lib/profileHeader.svelte';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    console.log($page.data)
</script>  

<section class="center w-full h-screen relative overflow-y-auto flex justify-start items-center flex-col">


    <ProfileHeader />

    <div class="min-h-[64px] w-full border-b border-gray-300 h-16 flex justify-between items-center px-4">
        <div class="flex justify-start items-center gap-x-2 text-xs">
            <div class="flex justify-start items-start flex-col">
                <h1 class="text-xl font-semibold"> Followed Communities </h1>
            </div>
        </div>
    </div>


    <div class="communities-list max-w-[725px] p-8 border-b w-full h-full flex justify-start items-center px-6 overflow-y-hidden overflow-x-auto gap-x-8 border-gray-300 min-h-[350px]">

    
        <Community />
        <Community />
        <Community />
        <Community />

    </div>

    <div class="min-h-[64px] w-full border-b border-gray-300 h-16 flex justify-between items-center px-4">
        <div class="flex justify-start items-center gap-x-2 text-xs">
            <div class="flex justify-start items-start flex-col">
                <h1 class="text-xl font-semibold"> All Categories </h1>
            </div>
        </div>
    </div>

    <div class="communities-list max-w-[725px] p-8 border-b w-full flex flex-wrap justify-evenly items-center px-2 gap-x-2 gap-y-6 border-gray-300">

    
        <Community />
        <Community />
        <Community />
        <Community />

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
