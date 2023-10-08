<script>
  import EquipmentSelectButton from "../lib/components/equipped-set/equipped-select-button.svelte";
  import EquipmentSelectModal from "./equipment-select-modal.svelte";

  // Component to display equipped set. Allows user to change the set through a modal.
  export let set;

  // default weapon category, saved so if user closes modal, it opens to same weapon

  $: isModalOpen = false;

  function openModal() {
    isModalOpen = true;
  }
</script>

<div class="flex flex-col bg-gray-300 p-3 rounded-lg grow">
  <p class="text-center font-bold text-lg mb-4">Equipped Set</p>
  <div class="grid grid-cols-2 gap-x-2 gap-y-2 grow">
    <EquipmentSelectButton
      label={"Type" in set.Weapon ? set.Weapon["Type"] : "Weapon"}
      skillKey={"Equipment Skills"}
      bind:inputGrade={set.WeaponGrade}
      element={"Element" in set.Weapon ? set.Weapon["Element"] : ""}
      equipment={set.Weapon}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Helm"}
      skillKey={"Helm Skills"}
      bind:inputGrade={set.HelmGrade}
      element={"Element" in set.Helm ? set.Helm["Element"] : ""}
      equipment={set.Helm}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Mail"}
      skillKey={"Mail Skills"}
      bind:inputGrade={set.MailGrade}
      element={"Element" in set.Mail ? set.Mail["Element"] : ""}
      equipment={set.Mail}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Arms"}
      skillKey={"Arms Skills"}
      bind:inputGrade={set.ArmsGrade}
      element={"Element" in set.Arms ? set.Arms["Element"] : ""}
      equipment={set.Arms}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Waist"}
      skillKey={"Waist Skills"}
      bind:inputGrade={set.WaistGrade}
      element={"Element" in set.Waist ? set.Waist["Element"] : ""}
      equipment={set.Waist}
      onClickFunction={openModal}
    />
    <EquipmentSelectButton
      label={"Legs"}
      skillKey={"Legs Skills"}
      bind:inputGrade={set.LegsGrade}
      element={"Element" in set.Legs ? set.Legs["Element"] : ""}
      equipment={set.Legs}
      onClickFunction={openModal}
    />
  </div>
</div>

{#if isModalOpen}
  <EquipmentSelectModal bind:set bind:isModalOpen />
{/if}
