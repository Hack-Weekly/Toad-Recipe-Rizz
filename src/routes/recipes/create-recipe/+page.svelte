<script lang="ts">
    import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance>
    <input type="text" name="recipeName" placeholder="name">
    <input type="description" name="description" placeholder="description">
    <input type="text" name="cookTime" placeholder="cook_time">
    <input type="text" name="picture" placeholder="picture">
    <button type="submit" class="border-8 border-green-500">Submit</button>
</form>
