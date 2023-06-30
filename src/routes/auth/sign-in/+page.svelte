<script lang="ts">
    // login aswell
    import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance>
    <input type="text" name="username" class="border-2 border-green-500">
    <input type="text" name="password" class="border-2 border-green-500">
    <button type="submit" class="border-2 border-green-500">submit</button>
</form>
