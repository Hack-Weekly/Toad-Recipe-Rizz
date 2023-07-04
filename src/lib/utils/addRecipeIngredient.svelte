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

</script>


<div class="ingredients-input mt-8">
    <label for="ingredients" class="block mb-2">Ingredients</label>
    <input type="text" id="ingredients" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" 
            bind:value={ingredientSearchQuery} 
            on:input={handleIngredientInputChange} 
            on:change={handleIngredientSelection} 
            placeholder="Enter Ingredients..." />
    
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


