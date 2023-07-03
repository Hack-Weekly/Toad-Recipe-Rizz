<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import defaultPic from '$lib/assets/defaultPic.png';
	
	let profilePic = defaultPic;

	// @ts-ignore
	function handleFileInputChange(event) {
		const file = event.target.files[0];
  		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const result = reader.result;
				if (typeof result === 'string') {
					profilePic = result;
				} else {
					profilePic = defaultPic;
				}
			};
			reader.readAsDataURL(file);
  		}
	}


	let categorySearchQuery = '';
  	let ingredientSearchQuery = '';
	let selectedCategories: any[] = [];
	let selectedIngredients: any[] = [];

	let categoryOptions = [
		'Option 1',
		'Option 21212312312312 oPdjakfakjf012sdafkla23rklaweslkdpoe3wfrfdoik0-21',
		'Option 3',
		'Option 4',
		'Option 5',
		'Italian',
		'Vegetarian',
		'Seafood'
	];

	const dispatch = createEventDispatcher();

	// @ts-ignore
	function handleCategoryInputChange(event) {
    	categorySearchQuery = event.target.value;
  	}

	// @ts-ignore
	function selectCategoryOption(option) {
		if (!selectedCategories.includes(option)) {
		selectedCategories = [...selectedCategories, option];
		}
		categorySearchQuery = '';
		dispatch('optionSelected', option);
	}

	// @ts-ignore
	function removeCategoryOption(option) {
		selectedCategories = selectedCategories.filter((selectedOption) => selectedOption !== option);
	}

	// @ts-ignore
	function handleCategorySelection(event) {
		const selectedValue = event.target.value;
		if (selectedValue && !selectedCategories.includes(selectedValue)) {
		selectCategoryOption(selectedValue);
		}
	}

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


<div class="profile-container px-4 h-full">

    <!-- <div class="profile-label px-4 py-2 mt-4">
        <p class="text-black text-xl w-160 h-50">Add Recipe</p>
    </div> -->

    <div class="flex flex-row justify-center mt-4  gap-x-4">
        
        <div class="">
            <div class="bg-[#175BCC] rounded-full w-32 h-32 flex items-center justify-center">
				<img src={profilePic} alt="Profile Pic" class="rounded-full w-full h-full object-cover" />
            </div>
        </div>

        <div class="flex justify-center items-start flex-col gap-y-2">

          <div class="">
                <div class="border-2 border-dashed rounded-lg p-8 bg-[#F3F3F3]">
                  <p class="text-lg text-gray-600 mb-4">Drop photo here to upload</p>
                  <label for="file-input" class="bg-gray-100 border border-black/10 text-black py-1 px-2 rounded">
                    Browse files
                  </label>
                  <input id="file-input" type="file" class="hidden" on:change={handleFileInputChange} />            
                </div>
            </div>
    
            <div class="flex justify-center">
                <button class="bg-[#FFE1DE] text-white py-1 px-6 rounded-md border border-red-300">
                    <p class="text-red-700">Delete</p>
                </button>
            </div>

        </div>

    </div>

    <div class="recipe-name-input mt-4">
        <label for="recipe-name" class="block mb-2">Name</label>
        <input type="text" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" placeholder="Pineapple Ham Pizza">
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
          <textarea id="description" class="w-full h-75 resize-none rounded-md border outline-none border-black/10 bg-gray-100 px-4 py-2" placeholder="Description" maxlength="250"></textarea>
        </div>
    </div>

	<div class="cook-time-input mt-4">
        <label for="cook-name" class="block mb-2">Cook Time</label>
        <input type="text" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" placeholder="1 hr 30 min">
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
          <textarea id="instructions" class="w-full h-75 resize-none rounded-md border outline-none border-black/10 bg-gray-100 px-4 py-2" placeholder="Instructions" maxlength="250"></textarea>
        </div>
    </div>

	<div class="ingredients-input mt-8">
		<label for="ingredients" class="block mb-2">Ingredients</label>
		<input type="text" id="ingredients" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" 
				bind:value={ingredientSearchQuery} 
				on:input={handleIngredientInputChange} 
				on:change={handleIngredientSelection} 
				placeholder="Enter Ingredients..." />
		
		<div class="flex justify-center items-start flex-col gap-y-2">
			{#each selectedIngredients as option}
			<div class="bg-blue-100 rounded-md p-2">
				<span>{option}</span>
				<button class="ml-2 text-red-500 hover:text-red-700" on:click={() => removeIngredientOption(option)}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M9 12h6" />
						<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
					  </svg>
				</button>
			  </div>
			{/each}
		</div>
	
		<!-- {#if ingredientSearchQuery && !selectedIngredients.includes(ingredientSearchQuery)}
			<div>
				<span>{ingredientSearchQuery}</span>
				<button on:click={() => selectIngredientOption(ingredientSearchQuery)}>Add</button>
			</div>
		{/if} -->
	</div>
							
							
	<div class="categories-input mt-8">
		<label for="categories" class="block mb-2">Categories</label>
		<input type="text" id="categories" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" 
				bind:value={categorySearchQuery} 
				on:input={handleCategoryInputChange} 
				on:change={handleCategorySelection} 
				placeholder="Search Categories..." 
				list="category-options" />

	  
		<datalist id="category-options">
			{#each categoryOptions as option}
				{#if option.toLowerCase().includes(categorySearchQuery.toLowerCase())}
				<option value={option} />
				{/if}
			{/each}
		</datalist>
		
		<div class="flex justify-center items-start flex-col gap-y-2">
			{#each selectedCategories as option}
			<div class="bg-blue-100 rounded-md p-2">
				<span>{option}</span>
				<button class="ml-2 text-red-500 hover:text-red-700" on:click={() => removeCategoryOption(option)}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M9 12h6" />
						<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
					  </svg>
				</button>
			  </div>
			{/each}
		</div>
	
		<!-- {#if categorySearchQuery && !selectedOptions.includes(categorySearchQuery)}
			<div>
				<span>{categorySearchQuery}</span>
				<button on:click={() => selectOption(categorySearchQuery)}>Add</button>
			</div>
		{/if} -->
	</div>

    <div class="w-full h-11 flex justify-start items-center mt-6 mb-4">
        <button class="w-full h-full bg-[#121212] text-white rounded-md text-center">
            Save
        </button>
    </div>

</div>
