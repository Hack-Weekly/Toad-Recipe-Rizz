<script>
    import { page } from '$app/stores';
    console.log($page.data)
</script>
<div class="communities-list p-8 border-b border-gray-300 flex flex-wrap gap-6">
    {#if $page.data.userCategories}
        {#each $page.data.userCategories as category }
        <div class="community w-64 h-72 rounded-md overflow-hidden relative after:absolute after:top-0 after:left-0 after:bg-gradient-to-t after:from-zinc-950/90 after:from-50 after:to-transparent after:to-90% after:w-full after:h-full">
            
            <div class="w-full h-full absolute z-10 flex flex-col justify-between items-center p-4">

                <div class="w-full flex justify-between items-center">
                    <div class="community-label py-2 px-4 rounded-full border border-gray-200 border-black/10 bg-white">
                        <p class="text-xs font-semibold"> Community </p>
                    </div>

                    <div class="heart-label py-1.5 px-1.5 flex justify-center items-center rounded-full border border-gray-200 border-black/10 bg-[#DEE9FE]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#175BCC" viewBox="0 0 24 24" stroke-width="1.5" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> 
                        </svg>    
                    </div>
                </div>

                <div class="w-full flex justify-center items-center flex-col gap-2">

                    <div class="w-full flex justify-start items-center px-2">
                        <p class="text-white text-2xl">{category.category.name}</p>
                    </div>

                    <div class="w-full flex justify-start items-center px-2 gap-x-1">
                        <div class="w-8 h-8 rounded-full">
                            <img src="https://i.ibb.co/5Gx5mc7/338178321-880290966603246-34525312457264604-n.jpg" alt="pfp" class="w-8 h-8 rounded-full object-cover">
                        </div>
                        <div class="w-8 h-8 rounded-full">
                            <img src="https://i.ibb.co/61JqF0F/352425321-3600352183521913-6904035111764913514-n.jpg" alt="pfp" class="w-8 h-8 rounded-full object-cover">
                        </div>
                    </div>

                </div>

            </div>

            <img src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="category-img" class="w-64 h-72 object-cover absolute rounded-md">

        </div>
        {/each}
    {/if}
</div>
