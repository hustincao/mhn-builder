<script>
  // Modal component to select equipment for a single set.

  import SelectEquipment from "$lib/components/select-equipment.svelte";
  import Checkbox from "$lib/components/checkbox.svelte";
  import { onDestroy, getContext, onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let isModalOpen;
  export let set;

  let searchText;

  // export let selectedWeaponCategory = "swordandshields";

  // let isEnabled = {
  //   Weapon: true,
  //   Helm: true,
  //   Mail: true,
  //   Arms: true,
  //   Waist: true,
  //   Legs: true,
  // };

  let modal_settings;

  getContext("modal_settings").subscribe((value) => {
    modal_settings = value;
  });

  const equipment_names = [
    "armors",
    "swordandshields",
    "hammers",
    "greatswords",
    "longswords",
    "lightbowguns",
    "bows",
  ];

  const equipments = {};
  const unsubscribes = [];

  function getTitleFromWeapon(weapon) {
    switch (weapon) {
      case "swordandshields":
        return "Sword and Shields";
      case "hammers":
        return "Hammers";
      case "greatswords":
        return "Great Swords";
      case "longswords":
        return "Long Swords";
      case "lightbowguns":
        return "Light Bow Guns";
      case "bows":
        return "Bows";
      default:
        return "";
    }
  }

  for (let name of equipment_names) {
    unsubscribes.push(
      getContext(name).subscribe((value) => {
        equipments[name] = value;
      })
    );
  }

  onMount(()=>{
    document.body.classList.add("overflow-y-hidden");
  });
  onDestroy(() => {
    document.body.classList.remove("overflow-y-hidden");
    unsubscribes.forEach((unsubscribe) => {
      unsubscribe();
    });
  });

</script>


<div
  in:fade={{ duration: 100 }}
  out:fade={{ duration: 100 }}
  class="z-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center"
>
  <button
    on:click={() => {
      isModalOpen = false;
    }}
    class="z-[51] absolute top-0 left-0 h-full w-full flex bg-black bg-opacity-50"
  />

  <div
    class="z-[52] bg-slate-300 overflow-x-hidden overflow-y-auto max-h-full divide-y-2 mx-5 md:mx-40 my-40 divide-slate-400 max-w-full grow rounded-lg overscroll-contain"
  >
    <div class="flex flex-col p-3 gap-y-2">
      <div class="flex flex-wrap-reverse justify-end gap-2">
        <input
          class="grow rounded-md px-2 py-1 text-xl shrink"
          bind:value={searchText}
          type="text"
          placeholder="Search name, skills, monster..."
        />
        <button
          class="bg-red-500 justify-self-end text-white font-bold rounded-md p-1"
          on:click={() => {
            isModalOpen = false;
          }}>Close</button
        >
      </div>
      <div class="flex flex-wrap gap-2">
        <select
          class="rounded-md px-2 hover:ring-slate-400 hover:ring-2"
          bind:value={modal_settings.selectedWeaponCategory}
        >
          <option class="hover:bg-slate-400" value="swordandshields"
            >Sword and Shield</option
          >
          <option value="hammers">Hammer</option>
          <option value="greatswords">Great Swords</option>
          <option value="longswords">Long Sword</option>
          <option value="bows">Bow</option>
          <option value="lightbowguns">Light Bow Gun</option>
        </select>
        <Checkbox label={"Weapon"} bind:isEnabled={modal_settings.isEnabled.Weapon} />
        <Checkbox label={"Helm"} bind:isEnabled={modal_settings.isEnabled.Helm} />
        <Checkbox label={"Mail"} bind:isEnabled={modal_settings.isEnabled.Mail} />
        <Checkbox label={"Arms"} bind:isEnabled={modal_settings.isEnabled.Arms} />
        <Checkbox label={"Waist"} bind:isEnabled={modal_settings.isEnabled.Waist} />
        <Checkbox label={"Legs"} bind:isEnabled={modal_settings.isEnabled.Legs} />
      </div>
    </div>

    {#if modal_settings.isEnabled.Weapon}
      <SelectEquipment
        list={equipments[modal_settings.selectedWeaponCategory]}
        title={getTitleFromWeapon(modal_settings.selectedWeaponCategory)}
        nameKey={"Tree"}
        valueKey={"Equipment Skills"}
        bind:value={set.Weapon}
        filter={searchText}
      />
    {/if}

    {#if modal_settings.isEnabled.Helm}
      <SelectEquipment
        list={equipments["armors"]}
        title="Helm"
        nameKey={"Tree"}
        valueKey={"Helm Skills"}
        bind:value={set.Helm}
        filter={searchText}
      />
    {/if}
    {#if modal_settings.isEnabled.Mail}
      <SelectEquipment
        list={equipments["armors"]}
        title="Mail"
        nameKey={"Tree"}
        valueKey={"Mail Skills"}
        bind:value={set.Mail}
        filter={searchText}
      />
    {/if}
    {#if modal_settings.isEnabled.Arms}
      <SelectEquipment
        list={equipments["armors"]}
        title="Arms"
        nameKey={"Tree"}
        valueKey={"Arms Skills"}
        bind:value={set.Arms}
        filter={searchText}
      />
    {/if}
    {#if modal_settings.isEnabled.Waist}
      <SelectEquipment
        list={equipments["armors"]}
        title="Waist"
        nameKey={"Tree"}
        valueKey={"Waist Skills"}
        bind:value={set.Waist}
        filter={searchText}
      />
    {/if}
    {#if modal_settings.isEnabled.Legs}
      <SelectEquipment
        list={equipments["armors"]}
        title="Legs"
        nameKey={"Tree"}
        valueKey={"Legs Skills"}
        bind:value={set.Legs}
        filter={searchText}
      />
    {/if}
  </div>
</div>
