<script lang="ts">
    // @ts-ignore
    import Community from '$lib/community.svelte';
    import FollowedCommunity from '$lib/followed_community.svelte';
    import CommunityCard from '$lib/community_card.svelte';
    import ProfileHeader from '$lib/profileHeader.svelte';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    console.log($page.data)
</script>  

<section class="center w-full h-screen relative overflow-y-auto flex justify-start items-center flex-col">


    <ProfileHeader />

    <div class="w-full border-gray-300 flex justify-between items-end px-4 pt-10">
        <div class="flex justify-start items-center gap-x-2 text-xs font-semibold">
            <div class="flex gap-x-2">
                <h1 class="text-xl"> Followed Communities </h1> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>                
            </div>
        </div>
    </div>


    <div class="communities-list max-w-[725px] border-b w-full h-96 flex justify-center items-start px-4 overflow-y-hidden border-gray-300 min-h-[200px]">
        <div class="overflow-auto communities-list pt-6 flex justify-start items-start w-full gap-x-6">
            <FollowedCommunity />
            <FollowedCommunity />
            <FollowedCommunity />
            <FollowedCommunity />
        </div>
    </div>

    <div class="w-full border-gray-300 flex justify-between items-end px-4 pt-10">
        <div class="flex justify-start items-center gap-x-2 text-xs font-semibold">
            <div class="flex gap-x-2">
                <h1 class="text-xl"> Discover New Communities </h1> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>                
            </div>
        </div>
    </div>


    <div class="communities-list max-w-[725px] border-b pb-4 w-full h-full flex justify-center items-start px-4 border-gray-300">

        <div class="communities-list pt-6 flex justify-start flex-wrap items-start w-full gap-6">
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
        </div>

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
