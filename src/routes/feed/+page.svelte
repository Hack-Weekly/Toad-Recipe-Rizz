<script lang="ts">
    
    // @ts-ignore
    import ShortRecipe from '$lib/shortRecipe.svelte';
    import ProfileHeader from '$lib/profileHeader.svelte';
    import { goto } from '$app/navigation';
    import sad from '$lib/assets/sad.png';
    export let data
    const recipeData = data.getRecipes
    const message = data.message || ""
    const categories = data.categories

    let searchValue1: string
    let searchValue2: string
    function subscribeToRecipeOnEnter(ev:any, val: string) {
        if (ev.key === "Enter") {
            goto(`/categories/follow/${val}`)
        }
    }
    // JUST NEED TO LOAD DATA INTO PAGE WHOEVER IS WORKING ON UI
</script>  

<section class="center w-full h-screen relative flex justify-start items-center flex-col">

    <ProfileHeader />

    <div class="overflow-y-auto mb-6">
        {#if recipeData}
            {#each recipeData as { category_id, recipe }}
                <ShortRecipe {recipe} {category_id} />
            {/each}
        {:else}
            <div class="flex flex-col items-center gap-3">
                <p class="text-center text-lg md:text-xl text-gray-400 mt-24">
                    Your feed looks a little bit empty
                </p>
                <p class="text-center text-lg md:text-xl text-gray-400 flex flex-col md:flex-row  items-center gap-1">
                    <span>try following some</span> 
                    <a href="/communities" class="text-blue-400 underline ">communities</a>
                </p>
                <img class="h-auto w-16 md:w-24 mt-12" src="{sad}" alt="Emoji">
            </div>
        {/if}
    </div>

    <div class="search w-full p-4 border-t border-gray-300 hidden max-xl:block">
        <div class="search-holder relative flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute right-4 text-black/75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input on:keydown={(ev) => subscribeToRecipeOnEnter(ev, searchValue1)} bind:value={searchValue1} class="w-full h-11 rounded-full border outline-none border-black/10 bg-gray-100 px-4" placeholder="Search categories..." list="categories-list">

            <datalist id="categories-list">
                {#each Object.entries(categories) as [ key, value ]}
                    <option value="{value.name}"/>
                {/each}
            </datalist>
        </div>
    </div>

</section>

<section class="end w-96 min-w-[384px] h-full border-l border-gray-300 pt-6 px-4 max-xl:hidden">

    <div class="search">
        <div class="search-holder relative flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute right-4 text-black/75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input on:keydown={(ev) => subscribeToRecipeOnEnter(ev, searchValue2)} bind:value={searchValue2} class="w-full h-11 rounded-full border outline-none border-black/10 bg-gray-100 px-4" placeholder="Search categories..." list="categories-list">
            <datalist id="categories-list">
                {#each Object.entries(categories) as [ key, value ]}
                    <option value="{value.name}"/>
                {/each}
            </datalist>

        </div>
    </div>

</section>
