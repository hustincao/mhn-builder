<script>
  // Component to display skills of a set.
  import { onDestroy, getContext } from "svelte";
  import { getSkills } from "$lib/utils";
  import Tooltip from "$lib/components/tooltip.svelte";

  export let set;
  let skills;

  const unsubscribe = getContext("skills").subscribe((value) => {
    skills = value;
  });
  onDestroy(unsubscribe);

  $: equippedSkills = getEquippedSkills(set);

  function getEquippedSkills(set) {
    let equippedSkills = {};
    if ("Tree" in set.Weapon) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Weapon["Equipment Skills"], 10)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Helm) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Helm["Helm Skills"], 10)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Mail) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Mail["Mail Skills"], 10)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Arms) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Arms["Arms Skills"], 10)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Waist) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Waist["Waist Skills"], 10)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Legs) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Legs["Legs Skills"], 10)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }
    return equippedSkills;
  }
</script>

<div class="bg-slate-300 p-3 rounded-lg shrink-0">
  <div class="flex items-center justify-center gap-x-2 mb-4">
    <p class="font-bold text-lg">Skills</p>
  </div>
  <div class="flex gap-x-2 gap-y-2 relative">
    {#if Object.keys(equippedSkills).length === 0}
      <p class="italic">No skills selected</p>
    {/if}
    <div class="flex flex-col gap-y-2">
      {#each Object.entries(equippedSkills).sort() as [name, level], i}
        {@const skill = skills?.find((s) => s["Name"] === name)}
        {#if skill}
          <Tooltip>
            <p slot="label" class="bg-slate-100 rounded-lg px-2">
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
              class="whitespace-nowrap bg-slate-100 rounded-lg px-2"
            >
              {level} / {skill["Maximum Level"]}
            </p>
            <ul slot="description">
              {@const descriptions = skill["Level Descriptions"].split(";")}
              {@const l = Math.min(level, descriptions.length - 1)}
              {#each descriptions as d, i}
                <li class={i !== l - 1 && "text-slate-400"}>
                  {d}
                </li>
              {/each}
            </ul>
          </Tooltip>
        {/if}
      {/each}
    </div>
  </div>
</div>
