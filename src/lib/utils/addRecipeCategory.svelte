<script lang="ts">

    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import algoliasearch from 'algoliasearch';

    const algoliaAppId = import.meta.env.VITE_ALGOLIA_APP_ID;
    const algoliaApiKey = import.meta.env.VITE_ALGOLIA_API_KEY;
    const algoliaIndex = import.meta.env.VITE_ALGOLIA_INDEX;

    const algoliaClient = algoliasearch(algoliaAppId, algoliaApiKey);
    const index = algoliaClient.initIndex(algoliaIndex);

    let searchResults: string | any[] = [];
    let categorySearchQuery = '';
    export let selectedCategories: any[] = [];
	let categoryOptions: string | any[] = [];

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
        if (selectedValue && !selectedCategories.includes(selectedValue) 
            && categoryOptions.includes(selectedValue)
            ) {
            selectCategoryOption(selectedValue);
        }
    }


    async function search() {
        console.log(categorySearchQuery);
        if (categorySearchQuery.trim() !== '') {
			const { hits } = await index.search(categorySearchQuery, {
				attributesToRetrieve: ['name'],
				hitsPerPage: 30,
			});
			searchResults = hits;

			categoryOptions = searchResults.map(item => item.name + ' ');
        } else {
        searchResults = [];
        }
    }

    onMount(() => {
        search();
    });

    $: {
      if (categorySearchQuery) {
        search();
      } else {
        searchResults = [];
      }
    }

</script>


<div class="categories-input mt-8">
    <label for="categories" class="block mb-2">Categories</label>
    <input type="text" id="categories" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" 
            bind:value={categorySearchQuery} 
            on:input={handleCategoryInputChange} 
            on:change={handleCategorySelection} 
            placeholder="Search" 
			list="category-options" />

	<datalist id="category-options">
		{#each categoryOptions as option}
			{#if option.toLowerCase().includes(categorySearchQuery.toLowerCase())}
				<option value={option} />
			{/if}
		{/each}
	</datalist>

    <div class="flex justify-start items-center flex-wrap w-[435px] pt-2 gap-y-2 gap-x-2">
        {#each selectedCategories as option}
        <div class="border-black/10 border bg-gray-100 max-w-[435px] w-fit rounded-md py-2 px-4 flex justify-start items-center">
            <p class="">{option}</p>
            <button type="button" class="ml-2 text-red-400 hover:text-red-500" on:click={() => removeCategoryOption(option)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
            </button>
          </div>
        {/each}
    </div>
</div>
