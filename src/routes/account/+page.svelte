<script lang="ts">
  // why arent we using the public folder for static assets?
 // import defaultPic from '$lib/assets/defaultPic.png';
	import { enhance } from '$app/forms';
  	import { page } from '$app/stores';
    import DeleteAccountModal from '$lib/DeleteAccountModal.svelte';
  	import type { ActionData } from "./$types";
  	export let form: ActionData
 	let profilePic = $page.data.picture;
  	export let data;

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
				profilePic = $page.data.picture;
			}
		};
     	reader.readAsDataURL(file);
    	}
	}

	let passwordHidden = true;

	function togglePassword() {
		passwordHidden = !passwordHidden;
	}

	let open = false;

	function openModal() {
		open = true;
	}

	function updateModalState() {
		open = false;
	}

</script>

<div class="profile-container px-4 h-full">
 <form method="POST" use:enhance>
     <div class="flex flex-row justify-center mt-4 gap-x-4">
         <div class="">
             <div class="bg-[#175BCC] rounded-full w-32 h-32 flex items-center justify-center">
                 <img src="{profilePic}" alt="Profile Pic" class="rounded-full w-full h-full object-cover" />
             </div>
         </div>
         <div class="flex justify-center items-start flex-col gap-y-2">
             <div class="w-full py-8 px-4 text-center border-dashed border border-gray-400 hover:border-white focus:border-green-500 rounded-lg">
                 <div class="relative group h-14 w-14 mx-auto mb-4">
                     <div class="flex items-center justify-center h-14 w-14 bg-[#121212] rounded-full">
                         <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path
                                 d="M6.71 5.71002L9 3.41002V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8947 9.73478 14 10 14C10.2652 14 10.5196 13.8947 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V3.41002L13.29 5.71002C13.383 5.80375 13.4936 5.87814 13.6154 5.92891C13.7373 5.97968 13.868 6.00582 14 6.00582C14.132 6.00582 14.2627 5.97968 14.3846 5.92891C14.5064 5.87814 14.617 5.80375 14.71 5.71002C14.8037 5.61706 14.8781 5.50645 14.9289 5.3846C14.9797 5.26274 15.0058 5.13203 15.0058 5.00002C15.0058 4.86801 14.9797 4.7373 14.9289 4.61544C14.8781 4.49358 14.8037 4.38298 14.71 4.29002L10.71 0.290018C10.6149 0.198978 10.5028 0.127613 10.38 0.0800184C10.1365 -0.0199996 9.86346 -0.0199996 9.62 0.0800184C9.49725 0.127613 9.3851 0.198978 9.29 0.290018L5.29 4.29002C5.19676 4.38326 5.1228 4.49395 5.07234 4.61577C5.02188 4.73759 4.99591 4.86816 4.99591 5.00002C4.99591 5.13188 5.02188 5.26245 5.07234 5.38427C5.1228 5.50609 5.19676 5.61678 5.29 5.71002C5.38324 5.80326 5.49393 5.87722 5.61575 5.92768C5.73757 5.97814 5.86814 6.00411 6 6.00411C6.13186 6.00411 6.26243 5.97814 6.38425 5.92768C6.50607 5.87722 6.61676 5.80326 6.71 5.71002ZM19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8947 17.2652 18 17 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V11C2 10.7348 1.89464 10.4804 1.70711 10.2929C1.51957 10.1054 1.26522 10 1 10C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.7957 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z"
                                 fill="#E8EDFF"
                             ></path>
                         </svg>
                     </div>
                     <input class="absolute top-0 left-0 h-14 w-14 opacity-0" id="picture" type="file" name="picture" on:change="{handleFileInputChange}" />
                 </div>
                 <p class="font-semibold leading-normal mb-1">
                     <span class="text-[#121212]">Click to upload a file</span>
                     <span class="text-gray-400">or drag and drop</span>
                 </p>
                 <span class="text-xs text-gray-400 font-semibold">PNG, JPG, WEBP, Max 10 MB</span>
             </div>
         </div>
     </div>
     
     {#if form?.message}
        <div role="alert" class="{form.message == "Updated successfully" ? "border-green-600 bg-green-50" : "border-red-500 bg-red-50"} rounded border-s-4 p-4 mt-2">
            <strong class="{form.message == "Updated successfully" ? "text-green-700" : "text-red-800" } block font-medium">{form.message == "Updated successfully" ? "Success" : "Something went wrong"}</strong>
            {#each form.message as msg}
                <p class="mt-2 text-sm {form.message == "Updated successfully" ? "text-green-700" : "text-red-800" }">
                    {msg.message ? msg.message : 'updated successfully'}
                </p>
            {/each}
        </div>
    {/if}

     <div class="username-input w-full mt-4">
         <label for="username" class="block mb-2">Name</label>
         <input type="text" name="name" value="{data.profile.name ? data.profile.name : ""}" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" placeholder="shaniayanofc" />
     </div>

     <div class="email-input mt-4">
         <label for="email" class="block mb-2">Email</label>
         <input type="text" name="email" value="{data.email}" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 px-4" placeholder="shaniayanofc@email.com" />
     </div>

     <div class="password-input mt-4">
         <label for="password" class="block mb-2">Password</label>

         <div class="input-container relative flex justify-center items-center">
             <input type={passwordHidden ? "password" : "text"} id="password" name="password" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 pl-3" placeholder="******">
             <button type="button" class="absolute right-0 flex justify-center items-center mr-2" on:click="{togglePassword}">
                 {#if passwordHidden}
                 <div class="">
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         class="icon icon-tabler icon-tabler-eye"
                         width="32"
                         height="32"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                     >
                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                         <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                         <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                     </svg>
                 </div>
                 {:else}
                 <div class="">
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         class="icon icon-tabler icon-tabler-eye-off"
                         width="32"
                         height="32"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                     >
                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                         <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                         <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                         <path d="M3 3l18 18" />
                     </svg>
                 </div>
                 {/if}
             </button>
         </div>
     </div>

     <div class="password-input mt-4">
         <label for="password" class="block mb-2">Confirm Password</label>

         <div class="input-container relative flex justify-center items-center">
             <input type={passwordHidden ? "password" : "text"} id="confirm_password" name="confirm_password" class="w-full h-11 rounded-md border outline-none border-black/10 bg-gray-100 pl-3" placeholder="******">
             <button class="absolute right-0 flex justify-center items-center mr-2" on:click="{togglePassword}">
                 {#if passwordHidden}
                 <div class="">
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         class="icon icon-tabler icon-tabler-eye"
                         width="32"
                         height="32"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                     >
                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                         <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                         <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                     </svg>
                 </div>
                 {:else}
                 <div class="">
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         class="icon icon-tabler icon-tabler-eye-off"
                         width="32"
                         height="32"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                     >
                         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
         <button type="submit" class="w-full h-full bg-[#121212] text-white rounded-md text-center">
             <span class="text-white">Update profile</span>
         </button>
     </div>
 </form>
 <div class="mt-6 border-t border-gray-300">
 	<h3 class="mt-3 text-lg text-red-800">DANGER ZONE</h3>
		<div class="w-full h-11 flex justify-start items-center mt-4">
			<button on:click={openModal} type="button" class="w-full h-full bg-red-600 hover:bg-red-700 transition ease-in duration-150 text-white rounded-md text-center">
				<span class="text-white">Delete account</span>
			</button>
		</div>
	</div>
	<DeleteAccountModal on:updateState={updateModalState} state={open}/>
</div>
