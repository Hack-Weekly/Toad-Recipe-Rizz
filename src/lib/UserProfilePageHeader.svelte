<script lang="ts">

    import { page } from '$app/stores'; 
    export let data:Object;
    let memberSince = new Date(data.profile.created_at).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });
</script>

{#if data.profile}
    <div class="account-info min-h-[64px] w-full h-32 flex justify-between items-center px-4">
        <div class="left-side flex justify-start items-center gap-x-6 text-xs mt-24">
            <img src="{data.profile.picture}" alt="account-pfp" class="w-24 h-24 lg:w-48 lg:h-48 rounded-full">
            <div class="flex justify-start items-start flex-col">
                <h1 class="text-xl lg:text-3xl text-[#121212]"> { data.profile.name } </h1>
                <span class="text-gray-500 mt-1">Member since {memberSince ? memberSince : 'unkown date'}</span>
                {#if $page.data.username && $page.data.username == data.profile.username}
                    <a href="/account" class="flex items-center gap-2 rounded-md bg-[#121212] px-5 py-3 mt-3 text-sm font-medium text-white">
                        <span>Edit Profile</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                            <path d="M13.5 6.5l4 4" />
                        </svg>
                    </a>
                {/if}
            </div>
        </div>
    </div>
{/if}
