<script>
  import Dropdown from "$lib/components/dropdown.svelte";

  // Component that displays the stats for a set.
  export let set;
  export let setLength;
  export let deleteSet;
  export let moveSetUp;
  export let moveSetDown;
  export let index;
  export let equippedSkills;

  let isHidden = false;

  function isNotEmpty(equipment) {
    return "Tree" in equipment;
  }

  // Assumes that armor grades are consistent and grows by n+1 second difference.
  const ARMOR_GRADES = [20, 34, 49, 65, 82, 100, 119, 139, 150, 182];

  $: health = 100;

  const HealthBoost = [10, 20, 30, 40, 50];
  $: health_bonus =
    "Health Boost" in equippedSkills
      ? HealthBoost[equippedSkills["Health Boost"] - 1]
      : 0;

  $: defense =
    (isNotEmpty(set.Helm) ? ARMOR_GRADES[set.HelmGrade - 1] : 0) +
    (isNotEmpty(set.Mail) ? ARMOR_GRADES[set.MailGrade - 1] : 0) +
    (isNotEmpty(set.Arms) ? ARMOR_GRADES[set.ArmsGrade - 1] : 0) +
    (isNotEmpty(set.Waist) ? ARMOR_GRADES[set.WaistGrade - 1] : 0) +
    (isNotEmpty(set.Legs) ? ARMOR_GRADES[set.LegsGrade - 1] : 0);

  const DefenseBoost = [20, 40, 60, 80, 100];
  $: defense_bonus =
    "Defense Boost" in equippedSkills
      ? DefenseBoost[equippedSkills["Defense Boost"] - 1]
      : 0;

  $: affinity = isNotEmpty(set.Weapon)
    ? set.Weapon["Affinities"].split(",")[
        set.WeaponGrade - set.Weapon["Minimum Grade"]
      ]
    : 0;

  const CriticalEye = [10, 15, 20, 30, 40];
  $: affinity_bonus =
    "Critical Eye" in equippedSkills
      ? CriticalEye[equippedSkills["Critical Eye"] - 1]
      : 0;

  $: attack = isNotEmpty(set.Weapon)
    ? set.Weapon["Attacks"].split(",")[
        set.WeaponGrade - set.Weapon["Minimum Grade"]
      ]
    : 0;

  const AttackBoost = [20, 40, 60, 80, 120];
  $: attack_bonus =
    "Attack Boost" in equippedSkills
      ? AttackBoost[equippedSkills["Attack Boost"] - 1]
      : 0;

  $: poison_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Poison"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const PoisonAttack = [50, 75, 100, 125, 150];
  $: poison_bonus =
    "Poison Attack" in equippedSkills
      ? PoisonAttack[equippedSkills["Poison Attack"]]
      : 0;

  $: paralysis_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Paralysis"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;

  const ParalysisAttack = [50, 100, 200, 350, 500];
  $: paralysis_bonus =
    "Paralysis Attack" in equippedSkills
      ? ParalysisAttack[equippedSkills["Paralysis Attack"]]
      : 0;
  $: fire_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Fire"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const FireAttack = [50, 75, 100, 125, 150];
  $: fire_bonus =
    "Fire Attack" in equippedSkills
      ? FireAttack[equippedSkills["Fire Attack"]]
      : 0;
  $: water_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Water"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const WaterAttack = [50, 75, 100, 125, 150];
  $: water_bonus =
    "Water Attack" in equippedSkills
      ? WaterAttack[equippedSkills["Water Attack"]]
      : 0;
  $: thunder_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Thunder"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const ThunderAttack = [50, 75, 100, 125, 150];
  $: thunder_bonus =
    "Thunder Attack" in equippedSkills
      ? ThunderAttack[equippedSkills["Thunder Attack"]]
      : 0;
  $: ice_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Ice"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const IceAttack = [50, 75, 100, 125, 150];
  $: ice_bonus =
    "Ice Attack" in equippedSkills
      ? IceAttack[equippedSkills["Ice Attack"]]
      : 0;
</script>

<div class="bg-slate-300 p-3 rounded-lg shrink-0">
  <div class="flex items-center mb-4 gap-x-2">
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
          class="enabled:hover:bg-slate-700 bg-slate-500 disabled:bg-slate-900 px-2 rounded-md"
          >Move Up</button
        >
        <button
          disabled={index === setLength - 1}
          on:click={() => {
            moveSetDown(index);
          }}
          class="enabled:hover:bg-slate-700 bg-slate-500 disabled:bg-slate-900 px-2 rounded-md"
          >Move Down</button
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
    <button
      class="p-1 rounded-md hover:bg-slate-400"
      on:click={() => {
        isHidden = !isHidden;
      }}
    >
      {#if isHidden}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
          ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          /></svg
        >
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
          ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          /></svg
        >
      {/if}
    </button>
  </div>
  {#if !isHidden}
    <div class="flex gap-x-2">
      <div class="flex flex-col gap-y-2">
        <p class="bg-slate-50 rounded-lg px-2">Health</p>
        <p class="bg-slate-50 rounded-lg px-2">Defense</p>
        <p class="bg-slate-50 rounded-lg px-2">Attack</p>
        <p class="bg-slate-50 rounded-lg px-2">Affinity</p>
        <p class="bg-slate-50 rounded-lg px-2">Poison</p>
        <p class="bg-slate-50 rounded-lg px-2">Paralysis</p>
        <p class="bg-slate-50 rounded-lg px-2">Fire</p>
        <p class="bg-slate-50 rounded-lg px-2">Water</p>
        <p class="bg-slate-50 rounded-lg px-2">Thunder</p>
        <p class="bg-slate-50 rounded-lg px-2">Ice</p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="bg-slate-50 rounded-lg px-2">
          {health}
          {health_bonus !== 0 ? `(+${health_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {defense}
          {defense_bonus !== 0 ? `(+${defense_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {attack}
          {attack_bonus !== 0 ? `(+${attack_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {affinity}
          {affinity_bonus !== 0 ? `(+${affinity_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {poison_attack}
          {poison_bonus !== 0 ? `(+${poison_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {paralysis_attack}
          {paralysis_bonus !== 0 ? `(+${paralysis_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {fire_attack}
          {fire_bonus !== 0 ? `(+${fire_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {water_attack}
          {water_bonus !== 0 ? `(+${water_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {thunder_attack}
          {thunder_bonus !== 0 ? `(+${thunder_bonus})` : ""}
        </p>
        <p class="bg-slate-50 rounded-lg px-2">
          {ice_attack}
          {ice_bonus !== 0 ? `(+${ice_bonus})` : ""}
        </p>
      </div>
    </div>
  {/if}
</div>
