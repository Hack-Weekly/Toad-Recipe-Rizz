<script>

    import { page } from '$app/stores'; 

</script>

{#if $page.data.username}
    <div class="account-info min-h-[64px] w-full border-b border-gray-300 h-16 flex justify-between items-center px-4">
        <div class="left-side flex justify-start items-center gap-x-2 text-xs">
            <img src={$page.data.picture} alt="account-pfp" class="w-11 h-11 rounded-full">
            <div class="flex justify-start items-start flex-col">
                <p class="text-gray-500"> { $page.data.username } </p>
                <span class="text-gray-400"> { $page.data.email } </span>
            </div>
        </div>
        <div class="right-side">
            <a href="/recipe/create"> <button class="py-2 px-4 max-sm:text-[10px] rounded-md bg-[#121212] text-white"> Create Recipe </button> </a>
        </div>
    </div>
{/if}