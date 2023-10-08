<script>
  import EquipmentButton from "./equipment-button.svelte";
  import { slide } from "svelte/transition";

  export let value = {};
  export let list = [];
  export let nameKey = "";
  export let valueKey = "";
  export let filter = "";
  export let title = "";

  $: filteredList = list.filter((a) => isFiltered(a));

  $: isFiltered = (armor) => {
    return (
      armor[valueKey].toLowerCase().includes(filter.toLowerCase()) ||
      armor[nameKey].toLowerCase().includes(filter.toLowerCase()) ||
      armor["Monster"].toLowerCase().includes(filter.toLowerCase())
    );
  };
</script>

<div in:slide={{ duration: 300 }} out:slide={{ duration: 300 }} class="py-4 flex items-center">
    <img
        class="h-12 w-12 mx-2"
        src={`/equipment-icons/${title.toLowerCase().replaceAll(" ", "")}.webp`}
        alt={`Equipment ${title} Icon`}
      />
  <div class="flex overflow-x-auto whitespace-nowrap gap-x-4 p-2">
    {#if filteredList.length === 0}
      <p class="italic text-center text-white">No {title} found</p>
    {/if}
    {#each filteredList as armor}
      <EquipmentButton
        armorName={armor[nameKey]}
        armorSkills={armor[valueKey]}
        element={"Element" in armor && armor["Element"] !== "None"
          ? armor["Element"]
          : ""}
        isSelected={value === armor}
        onClick={() => {
          value = armor;
        }}
      />
    {/each}
  </div>
</div>
