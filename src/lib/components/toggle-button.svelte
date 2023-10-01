<script>
    export let label = "";
    export let isEnabled = false;

    const minus = `<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>`;
    const plus = `<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>`
</script>

<button class="flex gap-x-2 px-2 py-1 bg-slate-400 justify-center items-center rounded-md hover:bg-slate-300">
    <svg
        class="fill-red-500 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">{@html plus}</svg
    >
    {label}</button
>