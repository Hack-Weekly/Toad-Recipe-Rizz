<script lang="ts">
    // login aswell
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    export let form: ActionData
</script>

<form method="POST" use:enhance>
    {#if form?.message}
        <p>{form.message}</p>
    {/if}
    <input type="text" name="username" class="border-2 border-green-500">
    <input type="text" name="password" class="border-2 border-green-500">
    <button type="submit" class="border-2 border-green-500">submit</button>
</form>
