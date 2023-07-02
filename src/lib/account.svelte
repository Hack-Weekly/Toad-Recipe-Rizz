<script>
    let passwordHidden = true;
  
    function togglePassword() {
      passwordHidden = !passwordHidden;
    }
  </script>
  
<div class="profile-container px-4 h-full">

    <!-- <div class="profile-label mt-4 px-4 py-2">
        <p class="text-black text-xl w-160 h-50">Profile</p>
    </div> -->

    <div class="flex flex-row justify-center mt-4 gap-x-4">
        
        <div class="">
            <div class="bg-[#175BCC] rounded-full w-32 h-32 flex items-center justify-center">
              <span class="text-white text-xl">Profile Pic</span>
            </div>
        </div>

        <div class="flex justify-center items-start flex-col gap-y-2">

          <div class="">
                <div class="border-2 border-dashed rounded-lg p-8 bg-[#F3F3F3]">
                  <p class="text-lg text-gray-600 mb-4">Drop photo here to upload</p>
                  <label for="file-input" class="bg-gray-100 border max-sm:py-0.5 max-sm:px-1 border-black/10 text-black py-1 px-2 rounded">
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

    <div class="username-input w-full mt-4">
        <label for="username" class="block mb-2">Username</label>
        <input type="text" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" placeholder="shaniayanofc">
    </div>

    <div class="email-input mt-4">
        <label for="email" class="block mb-2">Email</label>
        <input type="text" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" placeholder="shaniayanofc@email.com">
    </div>

    <div class="password-input mt-4">
        <label for="password" class="block mb-2">Password</label>
        
        <div class="input-container relative flex justify-center items-center">
          <input type="password" id="password" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 pl-3" placeholder="******">
          <button class="absolute right-0 flex justify-center items-center mr-2" on:click={togglePassword}>
            
            {#if passwordHidden}
            <div class="">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
            </div>
            {:else}
            <div class="">
                <svg xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-eye-off" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                    <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                    <path d="M3 3l18 18" />
                  </svg>
            </div>
            {/if}

          </button>
        </div>

      </div>

    <div class="w-full h-11 flex justify-start items-center mt-4">
        <button class="w-full h-full bg-[#121212] text-white rounded-md text-center">
            <p class="text-white"> Save </p>
        </button>
    </div>

</div>