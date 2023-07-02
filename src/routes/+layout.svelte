<script>
// @ts-nocheck

    import "../app.css";
    import { page } from '$app/stores'
    import Navbar from '$lib/navbar.svelte';
    
</script>
  
{#if $page.url.pathname != '/auth/sign-in' && $page.url.pathname != '/auth/sign-up' && $page.status != 404 && $page.status != 500 && $page.status != 403 && $page.status != 401 && $page.status != 400 && $page.status != 405}
    <Navbar />
    <slot />
{:else}
    <slot />
{/if}