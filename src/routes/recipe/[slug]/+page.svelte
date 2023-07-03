<script lang="ts">
    import { page } from "$app/stores";
    const username = $page.data.username
    export let data
    console.log(data)
    const { recipe_creator, recipe_name, description, ingredient, instructions, recipeCanBeUpdated, slug } = data
    console.log(recipeCanBeUpdated)
    import { goto } from "$app/navigation";
</script>

{#if recipeCanBeUpdated}
    <button on:click={() => goto(`http://localhost:5173/profile/${username}/myrecipes/update/${slug}`)} class="bg-blue-500 text-white">Update</button>
{/if}

<h1>{recipe_name}</h1>
<h2>Author: {recipe_creator}</h2>
<h2>Description: {description}</h2>
<h2>Ingredients: {ingredient}</h2>
<h2>Instructions: {instructions}</h2>

