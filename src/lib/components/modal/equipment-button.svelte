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
    (isSelected ? " bg-green-300" : " bg-slate-50")}
  on:click={onClick}
>
  <div class="flex flex-col justify-start h-full py-1 relative">
    {#if isSelected}
    <svg
      class="absolute -right-1 h-5 w-5 -top-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
      /></svg
    >
    {/if}

    <div class="font-bold flex w-full justify-center gap-x-2">
      {#if element}
        <img
          class="h-5 w-5"
          src={`/element-icons/element-${element.toLowerCase()}.webp`}
          alt={`Element ${element} Icon`}
        />
      {/if}
      {armorName}
    </div>
    {#each armorSkills.split("\n") as skill}
      <p class="flex items-center text-base">
        {skill}
      </p>
    {/each}
  </div>
</button>
