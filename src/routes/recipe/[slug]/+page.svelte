<script lang="ts">
    export let data
    console.log(data)
    const { recipe_id, recipe_creator, recipe_name, description, ingredient, instructions } = data
</script>

<h1>{recipe_name}</h1>
<h2>Recipe Id {recipe_id}</h2>
<h2>Author: {recipe_creator}</h2>
<h2>Description: {description}</h2>
<h2>Ingredients: {ingredient}</h2>
<h2>Instructions: {instructions}</h2>

