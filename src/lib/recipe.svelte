<div class="recipe-container w-full p-4 gap-x-4 flex justify-center items-start border-b border-gray-300">

    <div class="recipe-img w-28 h-full mt-2">
        <img src="https://recipes.eerieemu.com/static/recipes/1024065-pineapple-ham-pizza.jpg" alt="recipe-img" class="object-cover w-20 h-20 rounded-md">
    </div>

    <div class="w-full h-full flex-col flex gap-y-3 justify-start items-start">

        <div class="w-full flex justify-between">
            <h1 class="recipe-title text-2xl"> Pineapple Ham Pizza </h1>
            <div class="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg> 
            </div>
        </div>

        <div class="flex justify-start gap-x-2">
            <span class="recipe-time py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xs"> 35 minutes </p>
            </span>
            <span class="author-of-the-recipe py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>                      
                <p class="text-xs"> shaniayanofc </p>
            </span>
        </div>

        <div class="categories flex justify-start gap-x-2 flex-wrap gap-y-2">
            {#each {length: 4} as _, i } 
            <span class="category py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-[#DEE9FE]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#175BCC" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> 
                </svg>                                         
                <p class="text-xs text-[#175BCC]"> dinner </p>
            </span>
            {/each}
            <span class="category py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-[#DEE9FE]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#175BCC" viewBox="0 0 24 24" stroke-width="1.5" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> 
                </svg>                                         
                <p class="text-xs text-[#175BCC]"> pizza and calzones </p>
            </span>
        </div>

        <div class="description flex justify-start text-xs flex-col">
            Pineapple ham pizza, sometimes referred to as Hawaiian pizza, was reportedly named after a brand of canned fruit, Hawaiian Pineapple Company. Sam Panopoulos, a Greek immigrant in Canada, used that fruit to create the ambrosial combination in 1962. But here, skipping canned pineapple in favor of fresh fruit and using cubed ham, ideally leftovers from a bone-in roast, means juicier meat and more vibrantly flavored pineapple.
        </div>

        <span class="instructions-label py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-[#DEE9FE]">                                       
            <p class="text-xs text-[#175BCC]"> Instructions </p>
        </span>

        <div class="instructions flex justify-start text-xs flex-col">
            Position a rack in the oven nearest to the heat source, on the highest or lowest spot depending on your model. Heat the oven to 450 degrees. Grease the center of a large sheet pan with 1 tablespoon olive oil.
            Flatten the dough in between your hands, then rotate the round in your hands like a wheel and pull it outwards to stretch into a 12-inch circle. Place the dough on the sheet pan. Evenly spread the tomato sauce over the dough, leaving a 1/4-inch border. Sprinkle with mozzarella, then top with ham and pineapple.
        </div>

        <span class="ingredients-label py-1 px-2 rounded border border-gray-200 flex items-center gap-x-1 border-black/10 bg-[#DEE9FE]">                                       
            <p class="text-xs text-[#175BCC]"> Ingredients </p>
        </span>

        <div class="instructions flex justify-start text-xs flex-col">
            ・Olive oil <br>
            ・1 (8- to 10-ounce) ball store-bought pizza dough, room temperature <br>
            ・1/2 cup Marcella Hazan’s tomato sauce or other pizza sauce <br>
            ・1 cup shredded low-moisture mozzarella cheese <br>
            ・1/2 cup cubed ham (about 1/2 inch) <br>
            ・1/2 cup fresh pineapple chunks (about 1/2 inch) <br> 
            ・Red-pepper flakes, for sprinkling <br>
        </div>

    </div>

</div>