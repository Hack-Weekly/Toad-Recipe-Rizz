<script lang="ts">
    import { goto } from "$app/navigation";
    export let recipe: any
    const picture = `https://recipes.eerieemu.com${recipe.picture}` || `${recipe.picture}`
    const { recipe_name, recipe_creator, recipe_categories, cook_time, description, instructions, ingredients } = recipe
</script>

<div class="recipe-container w-full p-4 gap-x-4 flex justify-center items-start border-b border-gray-300">

    <div class="recipe-img w-28 h-full mt-2">
        <img src={picture} alt="recipe-img" class="object-cover w-20 h-20 rounded-md">
    </div>

    <div class="w-full h-full flex-col flex gap-y-3 justify-start items-start">

        <div class="w-full flex justify-between">
            <h1 class="recipe-title text-2xl"> { recipe_name } </h1>
            <div class="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </div>
        </div>

        <div class="flex justify-start gap-x-2">
            <span class="recipe-time py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xs"> {cook_time} </p>
            </span>
            <span class="author-of-the-recipe py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>                      
                <p class="text-xs"> {recipe_creator} </p>
            </span>
        </div>

        <div class="categories flex justify-start gap-x-2 flex-wrap gap-y-2">
            {#each recipe_categories as { name } } 
                <button on:click={() => goto(`/categories/follow/${name}`)} class="category py-1 px-2 rounded hover:bg-red-300 border border-gray-200 flex items-center gap-x-1 border-black/10 bg-[#DEE9FE]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#175BCC" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> 
                </svg>                                         
                <p class="text-xs text-[#175BCC]"> {name} </p>
            </button>
            {/each}                                       
        </div>

        <div class="description flex justify-start text-sm flex-col">
            {description}
        </div>

        <span class="instructions-label py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-[#DEE9FE]">                                       
            <p class="text-xs text-[#175BCC]"> Instructions </p>
        </span>

        <div class="instructions flex justify-start text-sm flex-col">
            {instructions.instructions || instructions}
        </div>

        <span class="ingredients-label py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-[#DEE9FE]">                                       
            <p class="text-xs text-[#175BCC]"> Ingredients </p>
        </span>

        <div class="instructions flex justify-start text-sm flex-col">
            {#if recipe.categoryNamesTrue !== false}
                <ul>
                {#each Object.keys(ingredients.ingredients) as ingredient}
                    <li>{ingredients.ingredients[ingredient]}</li>
                {/each}
                </ul>
            {:else}
                <ul>
                    {#each ingredients as ingredient}
                        <li>{ingredient}</li>
                    {/each}
                </ul>
            {/if}
        </div>

    </div>

</div>
