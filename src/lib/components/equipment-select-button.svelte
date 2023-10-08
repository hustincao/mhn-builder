<script>
  import GradeButton from "./grade-button.svelte";

  export let label;
  export let skillKey;
  export let equipment;
  export let onClickFunction;
  export let grade;

  $: isEmpty = !("Tree" in equipment);
  $:{
    if(!isEmpty && grade < equipment["Minimum Grade"]){
      grade = equipment["Minimum Grade"];
    }
  }
</script>

<div class="flex flex-col divide-y-2 divide-slate-700 ">


  <button
    class="bg-slate-50 rounded-t-lg hover:bg-slate-400 grow"
    on:click={onClickFunction}
  >
    <p class="font-bold">
      {label} - {isEmpty ? `Select ${label}` : equipment.Tree}
    </p>
    {#if skillKey in equipment}
      {#each equipment[skillKey].split("\n") as skill}
        <p>{skill}</p>
      {/each}
    {/if}
  </button>
  <GradeButton
  bind:grade
  onDecrease={() => {
    grade -= 1;
  }}
  onIncrease={() => {
    grade += 1;
  }}
  min={isEmpty ? 1 : equipment["Minimum Grade"]}
  max={10}
/>
</div>
