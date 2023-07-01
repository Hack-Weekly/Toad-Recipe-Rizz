<!-- Script code is for ingredients -->
<!-- Functionality not working currently -->

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
  
    let ingredients: string[] = ['']; // Initial array with an empty ingredient
    let currentIngredient: string = ''; // Tracks the currently typed ingredient
    const MAX_CHARACTERS: number = 250; // Maximum character limit for ingredients
  
    const dispatch = createEventDispatcher();
  
    function addIngredient(): void {
      ingredients.push(currentIngredient);
      currentIngredient = '';
    }
  
    function handleInput(event: Event): void {
      currentIngredient = (event.target as HTMLTextAreaElement).value;
    }
  
    function handleKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
        event.preventDefault();
        addIngredient();
      }
    }
  
    let addedIngredients: string[];
  
    $: {
      addedIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
    }
  </script>


<div class="profile-container px-4 pt-4 h-full">

    <!-- <div class="profile-label px-4 py-2 mt-4">
        <p class="text-black text-xl w-160 h-50">Add Recipe</p>
    </div> -->

    <div class="flex flex-row justify-center mt-4 gap-x-4">
        
        <div class="">
            <div class="bg-[#175BCC] rounded-full w-32 h-32 flex items-center justify-center">
              <span class="text-white text-xl">Recipe Pic</span>
            </div>
        </div>

        <div class="flex justify-center items-start flex-col gap-y-2">

          <div class="">
                <div class="border-2 border-dashed rounded-lg p-8 bg-[#F3F3F3]">
                  <p class="text-lg text-gray-600 mb-4">Drop photo here to upload</p>
                  <label for="file-input" class="bg-gray-100 border border-black/10 text-black py-1 px-2 rounded">
                    Browse files
                  </label>
                  <input id="file-input" type="file" class="hidden" />                  
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

    <!-- <div class="ingredients-input mt-4">

        <div class="flex flex-row">
          <div class="mt-4">
            <label for="ingredients" class="block mb-2">Ingredients</label>
          </div>
          <div class="mt-4 ml-auto">
            <label for="ingredients" class="block mb-2">0 / 250</label>
          </div>

        </div>
        <div class="relative">
          <textarea id="ingredients" class="w-full h-75 resize-none rounded-md border outline-none border-black/10 bg-gray-100 px-4 py-2" placeholder="Ingredients" maxlength="250"></textarea>
        </div>
    </div> -->
      

    <div class="ingredients-input mt-4">
        <div class="flex flex-row">

          <div class="mt-4">
            <label for="ingredients" class="block mb-2">Ingredients</label>
          </div>

          <!-- <div class="mt-4 ml-auto">
            <label for="ingredients" class="block mb-2">{addedIngredients.length} / {MAX_CHARACTERS}</label>
          </div> -->

        </div>

        <div class="relative">
          <textarea
            id="ingredients"
            class="w-full h-75 resize-none rounded-md border outline-none border-black/10 bg-gray-100 px-4 py-2"
            placeholder="Ingredients"
            maxlength={MAX_CHARACTERS}
            bind:value={currentIngredient}
            on:input={handleInput}
            on:keypress={handleKeyPress}
          ></textarea>
        </div>

        <div>
          <button class="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded" on:click={addIngredient}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>            
          </button>
        </div>

        {#if addedIngredients.length > 0}
          <ul class="mt-4 bg-red-300 w-full">
            {#each addedIngredients as ingredient}
              <li>{ingredient}</li>
            {/each}
          </ul>
        {/if}

    </div>

    
    
    <div class="categories-input mt-8">
        <label for="categories" class="block mb-2">Categories</label>
        <input type="text" id="categories" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" placeholder="Categories" list="category-options">
        <datalist id="category-options">
            <option value="Italian">
            <option value="Vegetarian">
            <option value="Seafood">
            <option value="Italian">
            <option value="Vegetarian">
            <option value="Seafood">
                <!-- Add more options as needed -->
        </datalist>
    </div>

    <div class="w-full h-11 flex justify-start items-center mt-6">
        <button class="w-full h-full bg-[#121212] text-white rounded-md text-center">
            <p class="text-white"> Save </p>
        </button>
    </div>

</div>