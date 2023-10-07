<script>
  // Component that displays the stats for a set.
  export let set;

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
  <p class="text-center font-bold text-lg mb-4">Stats</p>
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
