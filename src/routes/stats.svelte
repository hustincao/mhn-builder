<script>
  import Dropdown from "$lib/components/dropdown.svelte";

  // Component that displays the stats for a set.
  export let set;
  export let setLength;
  export let deleteSet;
  export let moveSetUp;
  export let moveSetDown;
  export let index;

  $: health = 100;
  $: defense = 0;
  $: affinity = 0;

  $: attack = 0;
  $: poison_attack = 0;
  $: paralysis_attack = 0;
  $: fire_attack = 0;
  $: water_attack = 0;
  $: thunder_attack = 0;
  $: ice_attack = 0;
</script>

<div class="bg-slate-300 p-3 rounded-lg shrink-0">
  <div class="flex items-center mb-4">
    <Dropdown>
      <svg
        slot="label"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 128 512"
        ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
          d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
        /></svg
      >
      <div slot="description" class="flex flex-col gap-y-2">
        <button
          disabled={index === 0}
          on:click={() => {
            moveSetUp(index);
          }}
          class="enabled:hover:bg-slate-700 bg-slate-500 disabled:bg-slate-900 px-2 rounded-md">Move Up</button
        >
        <button
        disabled={index === setLength - 1}
          on:click={() => {
            moveSetDown(index);
          }}
          class="enabled:hover:bg-slate-700 bg-slate-500 disabled:bg-slate-900 px-2 rounded-md">Move Down</button
        >
        <button
          on:click={() => {
            deleteSet(index);
          }}
          class="bg-red-700 hover:bg-red-900 px-2 rounded-md">Delete</button
        >
      </div>
    </Dropdown>
    <p class="text-center font-bold text-lg grow">Stats</p>
  </div>

  <div class="flex gap-x-2">
    <div class="flex flex-col gap-y-2">
      <p class="bg-slate-100 rounded-lg px-2">Health</p>
      <p class="bg-slate-100 rounded-lg px-2">Defense</p>
      <p class="bg-slate-100 rounded-lg px-2">Attack</p>
      <p class="bg-slate-100 rounded-lg px-2">Affinity</p>
      <p class="bg-slate-100 rounded-lg px-2">Poison</p>
      <p class="bg-slate-100 rounded-lg px-2">Paralysis</p>
      <p class="bg-slate-100 rounded-lg px-2">Fire</p>
      <p class="bg-slate-100 rounded-lg px-2">Water</p>
      <p class="bg-slate-100 rounded-lg px-2">Thunder</p>
      <p class="bg-slate-100 rounded-lg px-2">Ice</p>
    </div>
    <div class="flex flex-col gap-y-2">
      <p class="bg-slate-100 rounded-lg px-2">{health}</p>
      <p class="bg-slate-100 rounded-lg px-2">{defense}</p>
      <p class="bg-slate-100 rounded-lg px-2">{attack}</p>
      <p class="bg-slate-100 rounded-lg px-2">{affinity}</p>
      <p class="bg-slate-100 rounded-lg px-2">{poison_attack}</p>
      <p class="bg-slate-100 rounded-lg px-2">
        {paralysis_attack}
      </p>
      <p class="bg-slate-100 rounded-lg px-2">{fire_attack}</p>
      <p class="bg-slate-100 rounded-lg px-2">{water_attack}</p>
      <p class="bg-slate-100 rounded-lg px-2">{thunder_attack}</p>
      <p class="bg-slate-100 rounded-lg px-2">{ice_attack}</p>
    </div>
  </div>
</div>
