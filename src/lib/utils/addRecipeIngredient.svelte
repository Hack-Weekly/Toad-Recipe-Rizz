<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    let ingredientSearchQuery = '';
	let selectedIngredients: any[] = [];

	const dispatch = createEventDispatcher();

	// @ts-ignore
	function handleIngredientInputChange(event) {
    	ingredientSearchQuery = event.target.value;
  	}

	// @ts-ignore
	function selectIngredientOption(option) {
		if (!selectedIngredients.includes(option)) {
		selectedIngredients = [...selectedIngredients, option];
		}
		ingredientSearchQuery = '';
		dispatch('optionSelected', option);
	}

	// @ts-ignore
	function removeIngredientOption(option) {
		selectedIngredients = selectedIngredients.filter((selectedOption) => selectedOption !== option);
	}

	// @ts-ignore
	function handleIngredientSelection(event) {
		const selectedValue = event.target.value;
		if (selectedValue && !selectedIngredients.includes(selectedValue)) {
		selectIngredientOption(selectedValue);
		}
	}

	// @ts-ignore
	function addIngredientOption() {
		const newIngredient = ingredientSearchQuery.trim();
		if (newIngredient && !selectedIngredients.includes(newIngredient)) {
			selectedIngredients = [...selectedIngredients, newIngredient];
		}
		ingredientSearchQuery = '';
	}

</script>


<div class="ingredients-input mt-8">
    <label for="ingredients" class="block mb-2">Ingredients</label>
    <input type="text" id="ingredients" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" 
            bind:value={ingredientSearchQuery} 
            on:input={handleIngredientInputChange} 
			on:change|preventDefault={handleIngredientSelection} 
            placeholder="Enter Ingredients..." 
			/>

	<button type="button" class="text-white font-bold py-2 px-4 rounded" on:click={addIngredientOption}>
		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
			<path d="M9 12l6 0" />
			<path d="M12 9l0 6" />
		</svg>
	</button>
			
	<div class="flex justify-start items-center flex-wrap w-[435px] pt-2 gap-y-2 gap-x-2">
		{#each selectedIngredients as option}
		<div class="border-black/10 border bg-gray-100 max-w-[435px] w-fit rounded-md py-2 px-4 flex justify-start items-center">
			<p class="">{option}</p>
			<button class="ml-2 text-red-400 hover:text-red-500" on:click={() => removeIngredientOption(option)}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</button>
		</div>
		{/each}
	</div>
</div>


