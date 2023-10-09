<script>
  // Component to display skills of a set.
  import { onDestroy, getContext } from "svelte";
  import {Tooltip} from "$lib";

  export let equippedSkills;
  let skills;
  let isHidden = false;

  const unsubscribe = getContext("skills").subscribe((value) => {
    skills = value;
  });

  onDestroy(unsubscribe);
</script>

<div class="bg-gray-300 p-3 rounded-lg shrink-0">
  <div class="flex items-center justify-center gap-x-2 mb-4">
    <p class="font-bold text-lg grow flex items-center justify-center gap-x-2">
      {#if !isHidden}
      <Tooltip>
        <svg
          slot="label"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
          ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
          /></svg
        >
        <div slot="description">
          <p>
            Hover/tap skill <span class="underline">name</span> to get a general
            description.
          </p>
          <p>
            Hover/tap skill <span class="underline">level</span> to get a detailed
            description.
          </p>
        </div>
      </Tooltip>
      {/if}
      Skills
    </p>
    

    <button
      class="p-1 rounded-md hover:bg-slate-400"
      on:click={() => {
        isHidden = !isHidden;
      }}
    >
      {#if isHidden}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
          ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          /></svg
        >
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
          ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          /></svg
        >
      {/if}
    </button>
  </div>
  {#if !isHidden}
    <div class="flex gap-x-2 gap-y-2 relative">
      {#if Object.keys(equippedSkills).length === 0}
        <p class="italic">No skills selected</p>
      {/if}
      <div class="flex flex-col gap-y-2">
        {#each Object.entries(equippedSkills).sort() as [name, level], i}
          {@const skill = skills?.find((s) => s["Name"] === name)}
          {#if skill}
            <Tooltip>
              <p slot="label" class="bg-slate-50 rounded-lg px-2">
                {name}
              </p>
              <p slot="description">{skill["Description"]}</p>
            </Tooltip>
          {/if}
        {/each}
      </div>
      <div class="flex flex-col gap-y-2">
        {#each Object.entries(equippedSkills).sort() as [name, level], i}
          {@const skill = skills?.find((s) => s["Name"] === name)}
          {#if skill}
            <Tooltip>
              <p
                slot="label"
                class="whitespace-nowrap bg-slate-50 rounded-lg px-2"
              >
                {level} / {skill["Maximum Level"]}
              </p>
              <ul slot="description">
                {@const descriptions = skill["Level Descriptions"].split(";")}
                {@const l = Math.min(level, descriptions.length)}
                {#each descriptions as d, i}
                  <li class={i !== l -1 ? "text-slate-400" : ""}>
                    {d}
                  </li>
                {/each}
              </ul>
            </Tooltip>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
