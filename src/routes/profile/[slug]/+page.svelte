<script lang="ts">
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";
    export let data
    console.log(data)
    const { isUser, username, name, userPicture, userRecipes } = data
</script>

<!---- Whoever is working on UI this is just a placeholder. ---->

<h1>WELCOME {name}</h1>
<h2>USERNAME {username}</h2>
<img src={userPicture} class="w-fit h-fit"/>
{#if isUser}
<form method="POST" use:enhance>
 <!-- No clue on how we will change user profile picture tbh, ill just add a image url input for now ---->
 <input type="text" name="name" class="border-2" placeholder="name">
 <input type="text" name="img" class="border-2" placeholder="profileImageUrl">
 <button  type="submit" class="border-2">submit</button>
</form>
{/if}

<h1>MYRECIPES PAGE</h1>

{#each userRecipes as {name, slug, created_at, updated_at}}
<div>
    <h1>{name}</h1>
    <h2>creator: {username}</h2>
    <h2>created: {created_at}</h2>
    <h2>updated: {updated_at}</h2>
     {#if isUser}
        <button on:click={() => goto(`http://localhost:5173/profile/${username}/myrecipes/delete/${slug}`)} class="bg-red-500 border-4 text-white">Delete</button>
        <button on:click={() => goto(`http://localhost:5173/profile/${username}/myrecipes/update/${slug}`)} class="bg-blue-500 text-white">Update</button>
     {/if}
</div>
{/each}
