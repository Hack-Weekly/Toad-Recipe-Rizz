<script lang="ts">
    import { enhance } from "$app/forms";
    export let data
    const { recipeName, description, ingredient, instructions, cookTime, created_at, updated_at  } = data
</script>

<form method="POST" use:enhance>
    <input type="text" name="recipeName" value="{recipeName}" placeholder="Recipe Name">
    <input type="text" name="cookTime" value="{cookTime}" placeholder="Cook Time">
    <textarea class="w-32 h-32" name="description" value={description} placeholder="Recipe Description"/>
    <button type="submit" class="bg-green-500 text-white">Submit</button>
</form>
