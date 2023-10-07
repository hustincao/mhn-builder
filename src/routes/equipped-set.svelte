<script>
  import EquipmentSelectButton from "$lib/components/equipment-select-button.svelte";
  import EqupimentSelectModal from "./equpiment-select-modal.svelte";

  // Component to display equipped set. Allows user to change the set through a modal.
  export let set;

  $: isModalOpen = false;

  function openModal() {
    console.log("Open Modal");
    isModalOpen = true;
  }
  $: console.log(isModalOpen);
</script>

<div class="flex flex-col bg-slate-300 p-3 rounded-lg grow">
  <p class="text-center font-bold text-lg mb-4">Equipped Set</p>
  <!-- <div class="flex grow"> hello</div> -->
  <div class="grid grid-cols-2 gap-x-2 gap-y-2 grow">
    <EquipmentSelectButton
      label={"Weapon"}
      equipment={set.Weapon}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Helm"}
      equipment={set.Helm}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Mail"}
      equipment={set.Mail}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Arms"}
      equipment={set.Arms}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Waist"}
      equipment={set.Waist}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Legs"}
      equipment={set.Legs}
      onClickFunction={openModal}
    />
  </div>
</div>

{#if isModalOpen}
  <EqupimentSelectModal bind:isModalOpen />
{/if}
