<script lang="ts">
    import { enhance } from "$app/forms";
    export let data
    const { username, name, userPicture } = data
</script>

<!---- Whoever is working on UI this is just a placeholder. ---->

<h1>WELCOME {name}</h1>
<h2>USERNAME {username}</h2>
<img src={userPicture} class="w-fit h-fit"/>

<form method="POST" use:enhance>
 <!-- No clue on how we wil change user profile picture tbh, ill just add a image url input for now ---->
 <input type="text" name="name" class="border-2" placeholder="name">
 <input type="text" name="img" class="border-2" placeholder="profileImageUrl">
 <button  type="submit" class="border-2">submit</button>
</form>
