<script>
    import Account from '$lib/account.svelte';

    export let data;
    const {picture} = data;
</script>  

<div class="overflow-y-auto mb-6">
    <Account {picture} />
</div>