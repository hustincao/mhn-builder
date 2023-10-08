<script>
  import { getSkillLevelGrade } from "$lib/utils";
  import GradeButton from "./grade-button.svelte";

  export let label;
  // export let labelIcon;
  export let skillKey;
  export let equipment;
  export let onClickFunction;
  export let inputGrade;
  export let element;

  $: isEmpty = !("Tree" in equipment);
  $: {
    if (!isEmpty && inputGrade < equipment["Minimum Grade"]) {
      inputGrade = equipment["Minimum Grade"];
    }
  }
</script>

<div class="flex flex-col divide-y-2 divide-slate-700">
  <button
    class="bg-slate-50 rounded-t-lg p-4 hover:bg-slate-400 grow"
    on:click={onClickFunction}
  >
    <p class="font-bold flex items-center justify-center gap-x-2">
      <img
        class="h-5 w-5"
        src={`/equipment-icons/${label.toLowerCase()}.webp`}
        alt={`Equipment ${label} Icon`}
      />
      {isEmpty ? `Select ${label}` : equipment.Tree} 
      {#if element && element !== "None"}
      
      <img
        class="h-5 w-5"
        src={`/element-icons/element-${element.toLowerCase()}.webp`}
        alt={`Element ${element} Icon`}
      />
    {/if}
    </p>
    {#if skillKey in equipment}
      {#each equipment[skillKey].split("\n") as skill}
        {@const { grade } = getSkillLevelGrade(skill)}
        <p class={`flex justify-center gap-x-2 items-center ${inputGrade < grade ? "line-through" : ""}`}>
          {#if inputGrade < grade}
          <svg class="fill-red-600 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          {/if}
          {skill}
        </p>
      {/each}
    {/if}
  </button>
  <GradeButton
    bind:inputGrade
    onDecrease={() => {
      inputGrade -= 1;
    }}
    onIncrease={() => {
      inputGrade += 1;
    }}
    min={isEmpty ? 1 : equipment["Minimum Grade"]}
    max={10}
  />
</div>
