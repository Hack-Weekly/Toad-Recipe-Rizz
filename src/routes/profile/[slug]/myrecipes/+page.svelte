<script lang="ts">
    export let data
    const userRecipes = data.userRecipes

    console.log(userRecipes)
    const username = data.username 
    import { goto } from "$app/navigation";
</script>

<h1>MYRECIPES PAGE</h1>

{#each userRecipes as {name, slug, created_at, updated_at}}
<div>
    <h1>{name}</h1>
    <h2>creator: {username}</h2>
    <h2>created: {created_at}</h2>
    <h2>updated: {updated_at}</h2>
    <button on:click={() => goto(`http://localhost:5173/profile/${username}/myrecipes/delete/${slug}`)} class="bg-red-500 border-4 text-white">Delete</button>
</div>
{/each}
