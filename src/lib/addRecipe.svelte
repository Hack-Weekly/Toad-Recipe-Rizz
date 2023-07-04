<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import defaultPic from '$lib/assets/defaultPic.png';
	import SearchCat from './addRecipeCategory.svelte';
	import AddRecipeCategory from './addRecipeCategory.svelte';
	
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


<div class="profile-container px-4 overflow-y-auto h-screen">

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

	<AddRecipeCategory />

    <div class="w-full h-11 flex justify-start items-center mt-6 mb-4">
        <button class="w-full h-full bg-[#121212] text-white rounded-md text-center">
            <p class="text-white"> Save </p>
        </button>
    </div>

</div>