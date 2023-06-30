<script lang="ts">
    // Auth could not be tested through postman since im supposed to receive the form from the page directly, so here is a simple form.
    // So to my understanding the password in input will be stored not in a password row but directly within the lucia key, just a fyi i guess.
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    export let form: ActionData
</script>

<form method="POST" use:enhance>
    {#if form?.message}
        <p>{form.message}</p>
    {/if}
    <input type="email" name="email" placeholder="Enter email" class="bg-gray-200">
    <input type="text" name="username" placeholder="Enter username" class="bg-gray-200">
    <input type="password" name="password" placeholder="Enter password" class="bg-gray-200">
    <button type="submit" class="bg-black rounded-md text-white py-2 px-3">submit</button>
</form>

