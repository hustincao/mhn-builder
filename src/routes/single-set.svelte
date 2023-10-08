<script>
  import Stats from "./equipped-stats.svelte";
  import Skills from "./equipped-skills.svelte";
  import EquippedSet from "./equipped-set.svelte";
  import { getSkills } from "$lib/utils";

  // Component that holds and allows user to change a single set
  export let set;
  export let setLength;
  export let index;
  export let deleteSet; // function to delete a set;
  export let moveSetUp; // function to move set up
  export let moveSetDown; // function to move set down

  $: equippedSkills = getEquippedSkills(set);

  function getEquippedSkills(set) {
    let equippedSkills = {};
    if ("Tree" in set.Weapon) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Weapon["Equipment Skills"], set.WeaponGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Helm) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Helm["Helm Skills"], set.HelmGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Mail) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Mail["Mail Skills"], set.MailGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Arms) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Arms["Arms Skills"], set.ArmsGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Waist) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Waist["Waist Skills"], set.WaistGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if ("Tree" in set.Legs) {
      for (const [skill, level] of Object.entries(
        getSkills(set.Legs["Legs Skills"], set.LegsGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }
    return equippedSkills;
  }
</script>

<div
  class="flex flex-row flex-wrap md:flex-nowrap gap-2 w-full max-w-screen-lg "
>

  <Stats bind:set {equippedSkills} {deleteSet} {moveSetUp} {moveSetDown} {index} {setLength}/>
  <Skills {equippedSkills} />
  <EquippedSet bind:set />
</div>
