<script>
  export let inputGrade;
  export let min;
  export let max;
</script>

  <select bind:value={inputGrade} class="flex w-full text-center bg-slate-700 rounded-b-lg text-white px-2">
    {#each {length:(max-min+1)} as _, i}
      <option value={i + min}>Grade {i+min}</option>
    {/each}
  </select>
