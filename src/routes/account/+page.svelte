<script lang="ts">
    import Account from '$lib/account.svelte';
    import {page} from "$app/stores";
    import type { PageData, ActionData } from './$types';

    export let data: PageData;
    let {picture} = data;
</script>  

<div class="overflow-y-auto mb-6">
    <Account {picture} />
</div>