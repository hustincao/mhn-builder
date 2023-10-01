<script>
    export let label = "";
    export let isEnabled = false;
    export let onToggle = () => {
        console.log("Toggle was unset");
    };

    const minus = `<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>`;
    const plus = `<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>`;
    const check = `<path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>`;

    const styles = {
        active: "bg-slate-400 hover:bg-slate-300",
        inactive: "bg-slate-50 hover:bg-slate-300",
    };
</script>

<button
    class={"flex gap-x-2 px-2 py-1 justify-center items-center rounded-md " +
        (isEnabled ? styles.active : styles.inactive)}
    on:click={onToggle}
>
    <svg
        class={"h-4 w-4 " + (isEnabled ? "fill-green-500" : "fill-red-500")}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
    >
        {#if isEnabled}
            {@html check}
        {:else}
            {@html minus}
        {/if}
    </svg>
    {label}</button
>
