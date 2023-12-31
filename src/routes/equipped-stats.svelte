<script>
  // Component that displays the stats for a set.
  import {Dropdown, Tooltip} from "$lib";

  export let set;
  export let setLength;
  export let deleteSet;
  export let moveSetUp;
  export let moveSetDown;
  export let duplicate;
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
      ? HealthBoost[Math.min(equippedSkills["Health Boost"], HealthBoost.length) - 1]
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
      ? DefenseBoost[Math.min(equippedSkills["Defense Boost"], DefenseBoost.length) - 1]
      : 0;

  $: affinity = isNotEmpty(set.Weapon)
    ? set.Weapon["Affinities"].split(",")[
        set.WeaponGrade - set.Weapon["Minimum Grade"]
      ]
    : 0;

  const CriticalEye = [10, 15, 20, 30, 40];
  $: affinity_bonus =
    "Critical Eye" in equippedSkills
      ? CriticalEye[Math.min(equippedSkills["Critical Eye"], CriticalEye.length) - 1]
      : 0;

  $: attack = isNotEmpty(set.Weapon)
    ? set.Weapon["Attacks"].split(",")[
        set.WeaponGrade - set.Weapon["Minimum Grade"]
      ]
    : 0;

  const AttackBoost = [20, 40, 60, 80, 120];
  $: attack_bonus =
    "Attack Boost" in equippedSkills
      ? AttackBoost[Math.min(equippedSkills["Attack Boost"], AttackBoost.length) - 1]
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
      ? PoisonAttack[Math.min(equippedSkills["Poison Attack"], PoisonAttack.length) - 1]
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
      ? ParalysisAttack[Math.min(equippedSkills["Paralysis Attack"],ParalysisAttack.length) - 1]
      : 0;
  $: fire_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Fire"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const FireAttack = [50, 100, 200, 350, 500];
  $: fire_bonus =
    "Fire Attack" in equippedSkills
      ? FireAttack[Math.min(equippedSkills["Fire Attack"], FireAttack.length) - 1]
      : 0;
  $: water_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Water"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const WaterAttack = [50, 100, 200, 350, 500];
  $: water_bonus =
    "Water Attack" in equippedSkills
      ? WaterAttack[Math.min(equippedSkills["Water Attack"], WaterAttack.length) - 1]
      : 0;
  $: thunder_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Thunder"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const ThunderAttack = [50, 100, 200, 350, 500];
  $: thunder_bonus =
    "Thunder Attack" in equippedSkills
      ? ThunderAttack[Math.min(equippedSkills["Thunder Attack"], ThunderAttack.length) -1]
      : 0;
  $: ice_attack =
    isNotEmpty(set.Weapon) && set.Weapon["Element"] === "Ice"
      ? set.Weapon["Special Attacks"].split(",")[
          set.WeaponGrade - set.Weapon["Minimum Grade"]
        ]
      : 0;
  const IceAttack = [50, 100, 200, 350, 500];
  $: ice_bonus =
    "Ice Attack" in equippedSkills
      ? IceAttack[Math.min(equippedSkills["Ice Attack"], IceAttack.length) - 1]
      : 0;
</script>

<div class="bg-gray-300 p-3 rounded-lg shrink-0">
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
          duplicate(index);
        }}
          class="enabled:hover:bg-slate-700 bg-slate-500 disabled:bg-slate-900 px-2 rounded-md"
          >
        Duplicate</button>
        <button
          on:click={() => {
            deleteSet(index);
          }}
          class="mt-2 bg-red-700 hover:bg-red-900 px-2 rounded-md">Delete</button
        >
      </div>
    </Dropdown>
    <p class="font-bold text-lg grow flex items-center justify-center gap-x-2">
      {#if !isHidden}
        <Tooltip>
          <svg
            slot="label"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
            /></svg
          >
          <div slot="description">
            <p>
              The only skills added onto stats are <span class="italic"
                >Health Boost, Defense Boost, Attack Boost, Critical Eye, Poison
                Attack, Paralysis Attack, Fire Attack, Water Attack, Thunder
                Attack, and Ice Attack.</span
              >
            </p>
          </div>
        </Tooltip>
      {/if}
      Stats
    </p>
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
