<script>
  import SelectEquipment from "$lib/components/select-equipment.svelte";
  import Checkbox from "$lib/components/checkbox.svelte";
  import { onDestroy, getContext } from "svelte";
  export let isModalOpen;
  export let set;

  let armors;

  let isEnabled = {
    Weapon: true,
    Helm: true,
    Mail: true,
    Arms: true,
    Waist: true,
    Legs: true,
  };

  const unsubscribe = getContext("armors").subscribe((value) => {
    armors = value;
  });

  onDestroy(unsubscribe);
</script>


<!-- <button class="z-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-slate-900 bg-opacity-50"></button> -->
<div
  class="z-50 fixed top-0 left-0 max-h-screen max-w-screen flex justify-center items-center bg-red-900 bg-opacity-50"
>
  <div
    class="bg-slate-300 overflow-x-hidden overflow-y-scroll max-h-full m-20 max-w-full"
  >
    <button
      on:click={() => {
        isModalOpen = false;
      }}>Close</button
    >
    <div class="flex flex-wrap gap-2">
      <Checkbox label={"Weapon"} bind:isEnabled={isEnabled.Weapon} />
      <Checkbox label={"Helm"} bind:isEnabled={isEnabled.Helm} />
      <Checkbox label={"Mail"} bind:isEnabled={isEnabled.Mail} />
      <Checkbox label={"Arms"} bind:isEnabled={isEnabled.Arms} />
      <Checkbox label={"Waist"} bind:isEnabled={isEnabled.Waist} />
      <Checkbox label={"Legs"} bind:isEnabled={isEnabled.Legs} />
    </div>
    {#if isEnabled.Helm}
      <SelectEquipment
        list={armors}
        title="Helm"
        nameKey={"Tree"}
        valueKey={"Helm Skills"}
        bind:value={set.Helm}
        filter={""}
      />
    {/if}
    {#if isEnabled.Mail}
      <SelectEquipment
        list={armors}
        title="Mail"
        nameKey={"Tree"}
        valueKey={"Mail Skills"}
        bind:value={set.Mail}
        filter={""}
      />
    {/if}
    {#if isEnabled.Arms}
      <SelectEquipment
        list={armors}
        title="Arms"
        nameKey={"Tree"}
        valueKey={"Arms Skills"}
        bind:value={set.Arms}
        filter={""}
      />
    {/if}
    {#if isEnabled.Waist}
      <SelectEquipment
        list={armors}
        title="Waist"
        nameKey={"Tree"}
        valueKey={"Waist Skills"}
        bind:value={set.Waist}
        filter={""}
      />
    {/if}
    {#if isEnabled.Legs}
      <SelectEquipment
        list={armors}
        title="Legs"
        nameKey={"Tree"}
        valueKey={"Legs Skills"}
        bind:value={set.Legs}
        filter={""}
      />
    {/if}
  </div>
</div>
