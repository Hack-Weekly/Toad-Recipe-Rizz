<script>
    import { page } from "$app/stores";
    import sad from '$lib/assets/sad.png';

</script>
<section class="relative py-20 sm:py-32 lg:py-64 overflow-hidden">
    <div class="relative container px-4 mx-auto">
        <div class="sm:flex items-start justify-center max-w-5xl gap-3 mx-auto">
            <img class="block mb-8 sm:mr-10 md:mr-14 h-auto w-56" src="{sad}" alt="Emoji">
            <div class="max-w-xs md:max-w-sm lg:max-w-2xl">
                <h1 class="text-4xl xs:text-6xl md:text-7xl font-bold text-gray-900 mb-6">
                    <span>Oh no!</span>
                    <span class="font-serif italic">Error {$page.status}</span>
                </h1>
                {#if $page.status === 404}
                    <p class="max-w-lg text-xl font-semibold text-gray-500 mb-14">Sorry, the page you are looking for doesn&apos;t exist or has been moved. Try searching our site:</p>
                {:else}
                    <p class="max-w-lg text-xl font-semibold text-gray-500 mb-14">We're sorry, but it looks like something went wrong on our end. You can try refreshing the page or visiting us again later</p>
                {/if}
                <a href="/" class="flex justify-center items-center gap-2 rounded-md bg-black px-5 py-3 text-md font-medium text-white w-full lg:w-1/4">
                    <span>Go home</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l14 0" />
                        <path d="M15 16l4 -4" />
                        <path d="M15 8l4 4" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section>
<style>
a svg {
    transition: transform 0.3s ease-in-out;
}
    
a:hover svg {
    transform: translateX(5px);
}
</style>

  