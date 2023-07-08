<script>
// @ts-nocheck
    import "../app.css";
    import { page } from '$app/stores'
    import Navbar from '$lib/navbar.svelte';    
</script>
  
{#if $page.url.pathname != "/auth/sign-in" && $page.url.pathname != "/auth/sign-up" && (($page.status >= 200 && $page.status < 300) || $page.form)}
    <Navbar />
    <slot />
{:else}
    <slot />
{/if}
