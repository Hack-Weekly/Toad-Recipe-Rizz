<script lang="ts">

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

    $: profilePic;

</script>


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

        <!-- <div class="flex justify-center">
            <button class="bg-[#FFE1DE] text-white py-1 px-6 rounded-md border border-red-300">
                <span class="text-red-700">Delete</span>
            </button>
        </div> -->

    </div>

</div>