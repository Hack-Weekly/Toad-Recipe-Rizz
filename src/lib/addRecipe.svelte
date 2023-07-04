<script lang="ts">

	import AddRecipeCategory from './utils/addRecipeCategory.svelte';
	import AddRecipeIngredient from './utils/addRecipeIngredient.svelte';
	import DisplayPic from './utils/displayPic.svelte';

</script>


<div class="profile-container px-4 overflow-y-auto h-screen">

    <!-- <div class="profile-label px-4 py-2 mt-4">
        <p class="text-black text-xl w-160 h-50">Add Recipe</p>
    </div> -->

    <DisplayPic />

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

		<div class="flex flex-row">
        	<div class="mt-4">
				<label for="cook-name" class="block mb-2">Cook Time</label>
          	</div>
		</div>

		<div class="relative">
        	<input type="text" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" placeholder="1 hr 30 min">
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

	<AddRecipeIngredient />

	<AddRecipeCategory />

    <div class="w-full h-11 flex justify-start items-center mt-6 mb-4">
        <button class="w-full h-full bg-[#121212] text-white rounded-md text-center">
            <span class="text-white"> Save </span>
        </button>
    </div>

</div>