<script>
  // Modal component to select equipment for a single set.

  import SelectEquipment from "$lib/components/select-equipment.svelte";
  import Checkbox from "$lib/components/checkbox.svelte";
  import { onDestroy, getContext } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  export let isModalOpen;
  export let set;

  let selectedWeaponCategory;
  let searchText;

  let isEnabled = {
    Weapon: true,
    Helm: true,
    Mail: true,
    Arms: true,
    Waist: true,
    Legs: true,
  };

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

  for (let name of equipment_names) {
    unsubscribes.push(
      getContext(name).subscribe((value) => {
        equipments[name] = value;
      })
    );
  }

  onDestroy(() => {
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

    class="z-[52] bg-slate-300 overflow-x-hidden overflow-y-auto max-h-full divide-y-2 mx-5 md:mx-40 my-40 divide-slate-400 max-w-full grow rounded-lg"
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
          bind:value={selectedWeaponCategory}
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
        <Checkbox label={"Weapon"} bind:isEnabled={isEnabled.Weapon} />
        <Checkbox label={"Helm"} bind:isEnabled={isEnabled.Helm} />
        <Checkbox label={"Mail"} bind:isEnabled={isEnabled.Mail} />
        <Checkbox label={"Arms"} bind:isEnabled={isEnabled.Arms} />
        <Checkbox label={"Waist"} bind:isEnabled={isEnabled.Waist} />
        <Checkbox label={"Legs"} bind:isEnabled={isEnabled.Legs} />
      </div>
    </div>

    {#if isEnabled.Weapon}
      <SelectEquipment
        list={equipments[selectedWeaponCategory]}
        title="Sword and Shields"
        nameKey={"Tree"}
        valueKey={"Equipment Skills"}
        bind:value={set.Weapon}
        filter={searchText}
      />
    {/if}

    {#if isEnabled.Helm}
      <SelectEquipment
        list={equipments["armors"]}
        title="Helm"
        nameKey={"Tree"}
        valueKey={"Helm Skills"}
        bind:value={set.Helm}
        filter={searchText}
      />
    {/if}
    {#if isEnabled.Mail}
      <SelectEquipment
        list={equipments["armors"]}
        title="Mail"
        nameKey={"Tree"}
        valueKey={"Mail Skills"}
        bind:value={set.Mail}
        filter={searchText}
      />
    {/if}
    {#if isEnabled.Arms}
      <SelectEquipment
        list={equipments["armors"]}
        title="Arms"
        nameKey={"Tree"}
        valueKey={"Arms Skills"}
        bind:value={set.Arms}
        filter={searchText}
      />
    {/if}
    {#if isEnabled.Waist}
      <SelectEquipment
        list={equipments["armors"]}
        title="Waist"
        nameKey={"Tree"}
        valueKey={"Waist Skills"}
        bind:value={set.Waist}
        filter={searchText}
      />
    {/if}
    {#if isEnabled.Legs}
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
