<script>
  export let label;
  export let equipment;
  export let onClickFunction;

  $: isEmpty = !("Name" in equipment);
</script>

<button class="bg-slate-50 rounded-lg hover:bg-slate-400" on:click={onClickFunction}>
  <p class="font-bold">{label}</p>
  {#if isEmpty}
    Select a {label}
  {/if}
</button>