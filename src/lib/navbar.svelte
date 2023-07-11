<script>

    import { page } from '$app/stores'; 

</script>

<!-- navbar start here -->
<section class="navbar w-96 min-w-[384px] max-lg:w-72 max-lg:min-w-[288px] max-sm:w-16 max-sm:min-w-[64px] h-full border-r flex justify-center items-start pt-6">

    <ul class="w-60 max-sm:w-16 h-80 flex justify-center items-center text-xl gap-4 flex-col">
        
        <li class="w-full h-11 max-sm:w-11 flex justify-start max-sm:justify-center items-center gap-x-4 max-sm:pl-0 pl-2 transition-all duration-300 hover:bg-gray-100 ease-in-out rounded-md">
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-building-store" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 21l18 0" />
                    <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                    <path d="M5 21l0 -10.15" />
                    <path d="M19 21l0 -10.15" />
                    <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                </svg>
             </a>
            <a href="/" class="max-sm:hidden"> Home </a>
        </li>
        {#if $page.data.username}
        <li class="w-full h-11 max-sm:w-11 flex justify-start max-sm:justify-center items-center max-sm:pl-0 pl-2 gap-x-4 transition-all duration-300 hover:bg-gray-100 ease-in-out rounded-md">
            <a href="/feed" class="">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-description" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                    <path d="M9 17h6" />
                    <path d="M9 13h6" />
                </svg>
            </a>
            <a href="/feed" class="max-sm:hidden"> Feed </a>
        </li>
        {/if}
        <li class="w-full h-11 max-sm:w-11 flex justify-start max-sm:justify-center items-center max-sm:pl-0 pl-2 gap-x-4 transition-all duration-300 hover:bg-gray-100 ease-in-out rounded-md">
            <a href="/communities" class="flex items-center gap-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <span class="max-sm:hidden"> Communities </span>           
            </a>
        </li>
        {#if $page.data.username}
        <li class="w-full h-11 max-sm:w-11 flex justify-start max-sm:justify-center items-center max-sm:pl-0 pl-2 gap-x-4 transition-all duration-300 hover:bg-gray-100 ease-in-out rounded-md">
            <a href="/auth/logout" class="flex items-center gap-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg> 
                <span class="max-sm:hidden"> Logout </span>
            </a>        
        </li>
        <li class="w-full h-11 flex justify-start items-center mt-2 max-sm:w-11">
            <a href="/account" class="w-full h-full">
                <button class="w-full h-full bg-[#121212] text-white rounded-md text-center">
                    <p class="max-sm:hidden text-white"> Account </p>
                    <p class="hidden max-sm:block text-white"> A </p>
                </button>
            </a>
        </li>
        { :else }
        <li class="w-full h-11 max-sm:w-11 flex justify-start max-sm:justify-center items-center max-sm:pl-0 pl-2 gap-x-4 transition-all duration-300 hover:bg-gray-100 ease-in-out rounded-md">
            <a href="/auth/sign-up" class="">   
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>              
            </a>
            <a href="/auth/sign-up" class="max-sm:hidden"> Sign Up </a>
        </li>
        { /if }
    </ul>

</section>
<!-- navbar end here -->