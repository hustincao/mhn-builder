<script>
  export let armorName;
  export let armorSkills; // Comes in as a single string
  export let element;
  export let isSelected = false;
  export let onClick = null;
</script>

<button
  disabled={onClick === null || isSelected}
  class={"rounded-lg p-2 " +
    (onClick !== null ? " enabled:hover:bg-slate-300" : "") +
    (isSelected ? " bg-green-100" : " bg-slate-50")}
  on:click={onClick}
>
  <div class="flex flex-col justify-start h-full">
    <div class="font-bold flex w-full justify-center gap-x-2">
      {armorName}
      {#if element}
        <img
          class="h-5 w-5"
          src={`/element-icons/element-${element.toLowerCase()}.webp`}
          alt={`Element ${element} Icon`}
        />
      {/if}
    </div>
    {#each armorSkills.split("\n") as skill}
      <p class="flex items-center text-base">
        {skill}
      </p>
    {/each}
  </div>
</button>
