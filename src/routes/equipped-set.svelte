<script>
  import EquipmentSelectButton from "$lib/components/equipment-select-button.svelte";
  import EquipmentSelectModal from "./equipment-select-modal.svelte";

  // Component to display equipped set. Allows user to change the set through a modal.
  export let set;

  $: isModalOpen = false;

  function openModal() {
    isModalOpen = true;
  }
</script>

<div class="flex flex-col bg-slate-300 p-3 rounded-lg grow">
  <p class="text-center font-bold text-lg mb-4">Equipped Set</p>
  <div class="grid grid-cols-2 gap-x-2 gap-y-2 grow">
    <EquipmentSelectButton
      label={"Weapon"}
      skillKey={"Equipment Skills"}
      bind:inputGrade={set.WeaponGrade}
      equipment={set.Weapon}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Helm"}
      skillKey={"Helm Skills"}
      bind:inputGrade={set.HelmGrade}
      equipment={set.Helm}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Mail"}
      skillKey={"Mail Skills"}
      bind:inputGrade={set.MailGrade}
      equipment={set.Mail}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Arms"}
      skillKey={"Arms Skills"}
      bind:inputGrade={set.ArmsGrade}
      equipment={set.Arms}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Waist"}
      skillKey={"Waist Skills"}
      bind:inputGrade={set.WaistGrade}
      equipment={set.Waist}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Legs"}
      skillKey={"Legs Skills"}
      bind:inputGrade={set.LegsGrade}
      equipment={set.Legs}
      onClickFunction={openModal}
    />
  </div>
</div>

{#if isModalOpen}
  <EquipmentSelectModal bind:set bind:isModalOpen />
{/if}
