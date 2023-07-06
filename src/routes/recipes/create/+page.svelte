<script lang="ts">
	
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import AddRecipeIngredient from '$lib/utils/addRecipeIngredient.svelte';
    import AddRecipeCategory from '$lib/utils/addRecipeCategory.svelte';
    import DisplayPic from '$lib/utils/displayPic.svelte';
	export let data;

	let selectedCategories: any[] = [];
	let selectedIngredients: any[] = [];

    let form: HTMLFormElement;

    onMount(() => {
    form.addEventListener('keypress', handleKeyPress);
    });

    // @ts-ignore
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }

	// @ts-ignore
	function handleFormSubmit(event) {
		selectedIngredients = [];
		selectedCategories = [];
	}

  </script>


<div class="profile-container px-4 h-full">

    <!-- <div class="profile-label px-4 py-2 mt-4">
        <p class="text-black text-xl w-160 h-50">Add Recipe</p>
    </div> -->
    <form method="POST" use:enhance bind:this={form} on:submit={handleFormSubmit}>
    
		<DisplayPic />

		<div class="recipe-name-input mt-4">
			<label for="recipe-name" class="block mb-2">Name</label>
			<input type="text" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" name="recipeName" placeholder="Pineapple Ham Pizza">
		</div>

		<div class="description-input mt-4">

			<div class="flex flex-row">
			<div class="mt-4">
				<label for="description" class="block mb-2">Description</label>
			</div>
			<!-- <div class="mt-4 ml-auto">
				<label for="description" class="block mb-2">0 / 250</label>
			</div> -->
			</div>
			<div class="relative">
			<textarea id="description" class="w-full h-75 resize-none rounded-md border outline-none border-black/10 bg-gray-100 px-4 py-2" name="description" placeholder="Description" maxlength="250"></textarea>
			</div>
		</div>

		<div class="cook-time-input mt-4">
			<label for="cook-name" class="block mb-2">Cook Time</label>
			<input type="text" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" name="cookTime" placeholder="1 hr 30 min">
		</div>

		<div class="instructions-input mt-4">

			<div class="flex flex-row">
			<div class="mt-4">
				<label for="instructions" class="block mb-2">Instructions</label>
			</div>
			<!-- <div class="mt-4 ml-auto">
				<label for="instructions" class="block mb-2">0 / 250</label>
			</div> -->
			</div>
			<div class="relative">
			<textarea id="instructions" class="w-full h-75 resize-none rounded-md border outline-none border-black/10 bg-gray-100 px-4 py-2" name="instructions" placeholder="Instructions" maxlength="250"></textarea>
			</div>
		</div>

	
		<AddRecipeIngredient bind:selectedIngredients />
		<textarea name="ingredients" value={selectedIngredients} class="hidden"></textarea>

		<AddRecipeCategory bind:selectedCategories />
		<textarea value={selectedCategories} name="categories" class="hidden"/>
							

		<div class="w-full h-11 flex justify-start items-center mt-6 mb-4">
			<button type="submit" class="w-full h-full bg-[#121212] text-white rounded-md text-center">
				Save
			</button>
		</div>
   </form>

</div>
