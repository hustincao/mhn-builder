<script>
    import { onMount } from "svelte";
    import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { ArmorButton, CheckBox, SelectWeapon } from "$lib";
  import GradeButton from "$lib/components/grade-button.svelte";
  import Tooltip from "$lib/components/tooltip.svelte";
  import { getSkillLevelGrade, getSkills } from "$lib/utils";

  let armors = [],
    swordandshields = [],
    hammers = [],
    greatswords = [],
    longswords = [],
    lightbowguns = [],
    bows = [],
    skills = [];
  const armorGrades = [20, 34, 49, 65, 82, 100, 119, 139, 160, 182];

  let selectedWeapon = {};
  let selectedHelm = {};
  let selectedMail = {};
  let selectedArms = {};
  let selectedWaist = {};
  let selectedLegs = {};

  onMount(async () => {
    armors = await fetch("/armors.json").then((r) => r.json());
    swordandshields = await fetch("/sword-and-shields.json").then((r) =>
      r.json()
    );
    hammers = await fetch("/hammers.json").then((r) => r.json());
    greatswords = await fetch("/great-swords.json").then((r) => r.json());
    longswords = await fetch("/long-swords.json").then((r) => r.json());
    bows = await fetch("/bows.json").then((r) => r.json());
    lightbowguns = await fetch("/light-bow-guns.json").then((r) => r.json());
    skills = await fetch("/skills.json").then((r) => r.json());
    selectedWeapon = swordandshields[0];
    selectedHelm = armors[0];
    selectedMail = armors[0];
    selectedArms = armors[0];
    selectedWaist = armors[0];
    selectedLegs = armors[0];
  });

  $: health = 100;

  $: defense =
    armorGrades[selectedHelmGrade - 1] +
    armorGrades[selectedMailGrade - 1] +
    armorGrades[selectedArmsGrade - 1] +
    armorGrades[selectedWaistGrade - 1] +
    armorGrades[selectedLegsGrade - 1];

  $: affinity = selectedWeapon?.hasOwnProperty("Affinities")
    ? selectedWeapon["Affinities"].split(",")[
        selectedWeaponGrade - selectedWeapon["Minimum Grade"]
      ]
    : 0;

  $: attack = selectedWeapon?.hasOwnProperty("Attacks")
    ? selectedWeapon["Attacks"].split(",")[
        selectedWeaponGrade - selectedWeapon["Minimum Grade"]
      ]
    : 0;

  $: poison_attack =
    selectedWeapon?.hasOwnProperty("Element") &&
    selectedWeapon["Element"] === "Poison"
      ? selectedWeapon["Special Attacks"].split(",")[
          selectedWeaponGrade - selectedWeapon["Minimum Grade"]
        ]
      : 0;
  $: paralysis_attack =
    selectedWeapon?.hasOwnProperty("Element") &&
    selectedWeapon["Element"] === "Paralysis"
      ? selectedWeapon["Special Attacks"].split(",")[
          selectedWeaponGrade - selectedWeapon["Minimum Grade"]
        ]
      : 0;
  $: fire_attack =
    selectedWeapon?.hasOwnProperty("Element") &&
    selectedWeapon["Element"] === "Fire"
      ? selectedWeapon["Special Attacks"].split(",")[
          selectedWeaponGrade - selectedWeapon["Minimum Grade"]
        ]
      : 0;
  $: water_attack =
    selectedWeapon?.hasOwnProperty("Element") &&
    selectedWeapon["Element"] === "Water"
      ? selectedWeapon["Special Attacks"].split(",")[
          selectedWeaponGrade - selectedWeapon["Minimum Grade"]
        ]
      : 0;
  $: thunder_attack =
    selectedWeapon?.hasOwnProperty("Element") &&
    selectedWeapon["Element"] === "Thunder"
      ? selectedWeapon["Special Attacks"].split(",")[
          selectedWeaponGrade - selectedWeapon["Minimum Grade"]
        ]
      : 0;

  $: ice_attack =
    selectedWeapon?.hasOwnProperty("Element") &&
    selectedWeapon["Element"] === "Ice"
      ? selectedWeapon["Special Attacks"].split(",")[
          selectedWeaponGrade - selectedWeapon["Minimum Grade"]
        ]
      : 0;

  let isShowMoreOptions = false;

  let isWeaponEnabled = true;
  let isHelmEnabled = true;
  let isMailEnabled = true;
  let isArmsEnabled = true;
  let isWaistEnabled = true;
  let isLegsEnabled = true;

  let selectedWeaponGrade = 10;
  let selectedHelmGrade = 10;
  let selectedMailGrade = 10;
  let selectedArmsGrade = 10;
  let selectedWaistGrade = 10;
  let selectedLegsGrade = 10;

  let searchText = "";
  let selectedWeaponCategory = "Sword and Shield";
  $: displayedWeaponCategory = (() => {
    switch (selectedWeaponCategory) {
      case "Sword and Shield":
        return swordandshields;
      case "Hammer":
        return hammers;
      case "Great Sword":
        return greatswords;
      case "Long Sword":
        return longswords;
      case "Light Bow Gun":
        return lightbowguns;
      case "Bow":
        return bows;
      default:
        return [];
    }
  })();

  let equippedSkills = {};


  $: {
    if (selectedWeapon["Minimum Grade"] > selectedWeaponGrade) {
      selectedWeaponGrade = selectedWeapon["Minimum Grade"];
    }
  }

  $: {
    equippedSkills = {};
    if (selectedWeapon) {
      for (const [skill, level] of Object.entries(
        getSkills(selectedWeapon["Equipment Skills"], selectedWeaponGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if (selectedHelm) {
      for (const [skill, level] of Object.entries(
        getSkills(selectedHelm["Helm Skills"], selectedHelmGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if (selectedMail) {
      for (const [skill, level] of Object.entries(
        getSkills(selectedMail["Mail Skills"], selectedMailGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if (selectedArms) {
      for (const [skill, level] of Object.entries(
        getSkills(selectedArms["Arms Skills"], selectedArmsGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if (selectedWaist) {
      for (const [skill, level] of Object.entries(
        getSkills(selectedWaist["Waist Skills"], selectedWaistGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }

    if (selectedLegs) {
      for (const [skill, level] of Object.entries(
        getSkills(selectedLegs["Legs Skills"], selectedLegsGrade)
      )) {
        if (skill in equippedSkills) equippedSkills[skill] += level;
        else equippedSkills[skill] = level;
      }
    }
  }

</script>

<div class="flex flex-col items-center min-h-screen bg-slate-700">
  <div class="flex w-full max-w-screen-lg justify-between flex-wrap px-3 my-4">
    <h1 class="text-3xl font-bold text-slate-300">
      Monster Hunter Now Set Builder
    </h1>
    <a
      class="flex gap-x-2 items-center text-xl text-white fill-white hover:text-blue-500 hover:fill-blue-500"
      href="https://github.com/hustincao/mhn-builder/issues"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
        ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
          d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
        />
      </svg>
      <p>Report a bug</p>
    </a>
  </div>
  <div
    class="flex flex-row flex-wrap md:flex-nowrap gap-3 w-full max-w-screen-lg"
  >
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
    <div class="bg-slate-300 p-3 rounded-lg shrink-0">
      <div class="flex items-center justify-center gap-x-2  mb-4">
      <p class="font-bold text-lg">Skills</p>
      <Tooltip>
        <svg slot="label" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
        <p slot="description">Hover/tap the name to get a general skill description. Hover/tap the skill level to get a more detailed description.</p>
    </Tooltip>
  </div>
      <div class="flex gap-x-2 gap-y-2 relative">
        <div class="flex flex-col gap-y-2">
          {#each Object.entries(equippedSkills).sort() as [name, level], i}
            <!-- <p>{name}</p> -->
            {@const skill = skills.find((s) => s["Name"] === name)}
            <Tooltip>
              <p slot="label" class="bg-slate-100 rounded-lg px-2">{name}</p>
              <p slot="description">{skill["Description"]}</p>
            </Tooltip>
          {/each}
        </div>
        <div class="flex flex-col gap-y-2">
          {#each Object.entries(equippedSkills).sort() as [name, level], i}
            {@const skill = skills.find((s) => s["Name"] === name)}
            <!-- <p>{level} / {skill["Maximum Level"]}</p> -->
            <Tooltip>
              <p slot="label" class="whitespace-nowrap bg-slate-100 rounded-lg px-2">
                {level} / {skill["Maximum Level"]}
              </p>
              <ul slot="description">
                {@const descriptions = skill["Level Descriptions"].split(";")}
                {@const l = Math.min(level, descriptions.length - 1)}
                {#each descriptions as d, i}
                  <li class={i !== l - 1 && "text-slate-400"}>
                    {d}
                  </li>
                {/each}
              </ul>
            </Tooltip>
          {/each}
        </div>
      </div>
    </div>

    <div class="bg-slate-300 p-3 rounded-lg grow">
      <p class="text-center font-bold text-lg mb-4">Equipped Set</p>
      <div class="grid grid-cols-2 gap-x-2 gap-y-2">
        {#if selectedWeapon.hasOwnProperty("Tree")}
          <ArmorButton
            armorName={selectedWeapon["Tree"]}
            armorSkills={selectedWeapon["Equipment Skills"]}
            element={selectedWeapon["Element"] !== "None"
              ? selectedWeapon["Element"]
              : ""}
            isSelected={true}
            selectedGrade={selectedWeaponGrade}
          />
        {/if}
        {#if selectedHelm.hasOwnProperty("Tree")}
          <ArmorButton
            armorName={selectedHelm["Tree"]}
            armorSkills={selectedHelm["Helm Skills"]}
            element={""}
            isSelected={true}
            selectedGrade={selectedHelmGrade}
          />
        {/if}

        {#if selectedMail.hasOwnProperty("Tree")}
          <ArmorButton
            armorName={selectedMail["Tree"]}
            armorSkills={selectedMail["Mail Skills"]}
            element={""}
            isSelected={true}
            selectedGrade={selectedMailGrade}
          />
        {/if}

        {#if selectedArms.hasOwnProperty("Tree")}
          <ArmorButton
            armorName={selectedArms["Tree"]}
            armorSkills={selectedArms["Arms Skills"]}
            element={""}
            isSelected={true}
            selectedGrade={selectedArmsGrade}
          />
        {/if}

        {#if selectedWaist.hasOwnProperty("Tree")}
          <ArmorButton
            armorName={selectedWaist["Tree"]}
            armorSkills={selectedWaist["Waist Skills"]}
            element={""}
            isSelected={true}
            selectedGrade={selectedWaistGrade}
          />
        {/if}

        {#if selectedLegs.hasOwnProperty("Tree")}
          <ArmorButton
            armorName={selectedLegs["Tree"]}
            armorSkills={selectedLegs["Legs Skills"]}
            element={""}
            isSelected={true}
            selectedGrade={selectedLegsGrade}
          />
        {/if}
      </div>
    </div>
  </div>

  <div
    class="flex flex-col w-full max-w-screen-lg min-h-[838px] bg-slate-300 rounded-lg mt-3"
  >
    <div class="flex px-3 pt-3 gap-x-3">
      <button
        class="px-2 bg-slate-100 rounded-md hover:bg-slate-400"
        on:click={() => {
          isShowMoreOptions = !isShowMoreOptions;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 128 512"
          ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
          /></svg
        >
      </button>

      <input
        class="grow rounded-md px-2 py-1 text-xl"
        bind:value={searchText}
        type="text"
        placeholder="Search name, skills, monster..."
      />
    </div>
    {#if isShowMoreOptions}
      <div transition:slide={{ delay: 10, duration: 300, easing: quintOut, axis: 'y' }} class="grid grid-cols-3 md:grid-cols-6 py-2 px-3 gap-x-3">
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="weapon-grade">Weapon Grade</label
          >
          <GradeButton
            grade={selectedWeaponGrade}
            onDecrease={() => {
              selectedWeaponGrade--;
            }}
            onIncrease={() => {
              selectedWeaponGrade++;
            }}
            min={selectedWeapon["Minimum Grade"]}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="helm-grade">Helm Grade</label
          >
          <GradeButton
            grade={selectedHelmGrade}
            onDecrease={() => {
              selectedHelmGrade--;
            }}
            onIncrease={() => {
              selectedHelmGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="mail-grade">Mail Grade</label
          >
          <GradeButton
            grade={selectedMailGrade}
            onDecrease={() => {
              selectedMailGrade--;
            }}
            onIncrease={() => {
              selectedMailGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="arms-grade">Arms Grade</label
          >
          <GradeButton
            grade={selectedArmsGrade}
            onDecrease={() => {
              selectedArmsGrade--;
            }}
            onIncrease={() => {
              selectedArmsGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="waist-grade">Waist Grade</label
          >
          <GradeButton
            grade={selectedWaistGrade}
            onDecrease={() => {
              selectedWaistGrade--;
            }}
            onIncrease={() => {
              selectedWaistGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="legs-grade">Legs Grade</label
          >
          <GradeButton
            grade={selectedLegsGrade}
            onDecrease={() => {
              selectedLegsGrade--;
            }}
            onIncrease={() => {
              selectedLegsGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
      </div>
    {/if}
    <div class="flex gap-x-3 gap-y-2 p-3 flex-wrap">
      <select
        class="rounded-md px-2 hover:ring-slate-400 hover:ring-2"
        bind:value={selectedWeaponCategory}
      >
        <option class="hover:bg-slate-400" value="Sword and Shield"
          >Sword and Shield</option
        >
        <option value="Hammer">Hammer</option>
        <option value="Great Sword">Great Swords</option>
        <option value="Long Sword">Long Sword</option>
        <option value="Bow">Bow</option>
        <option value="Light Bow Gun">Light Bow Gun</option>
      </select>
      <CheckBox label={"Weapon"} bind:isEnabled={isWeaponEnabled} />
      <CheckBox label={"Helm"} bind:isEnabled={isHelmEnabled} />
      <CheckBox label={"Mail"} bind:isEnabled={isMailEnabled} />
      <CheckBox label={"Arms"} bind:isEnabled={isArmsEnabled} />
      <CheckBox label={"Waist"} bind:isEnabled={isWaistEnabled} />
      <CheckBox label={"Legs"} bind:isEnabled={isLegsEnabled} />
    </div>
    <div class="flex flex-col gap-y-2 pt-2 border-t-2 border-slate-500">
      {#if isWeaponEnabled}
        <SelectWeapon
          list={displayedWeaponCategory}
          title={selectedWeaponCategory}
          nameKey={"Tree"}
          valueKey={"Equipment Skills"}
          selectedGrade={selectedWeaponGrade}
          bind:selectedValue={selectedWeapon}
          filter={searchText}
        />
      {/if}
      {#if isHelmEnabled}
        <SelectWeapon
          list={armors}
          title="Helm"
          nameKey={"Tree"}
          valueKey={"Helm Skills"}
          selectedGrade={selectedHelmGrade}
          bind:selectedValue={selectedHelm}
          filter={searchText}
        />
      {/if}
      {#if isMailEnabled}
        <SelectWeapon
          list={armors}
          title="Mail"
          nameKey={"Tree"}
          valueKey={"Mail Skills"}
          selectedGrade={selectedMailGrade}
          bind:selectedValue={selectedMail}
          filter={searchText}
        />
      {/if}
      {#if isArmsEnabled}
        <SelectWeapon
          list={armors}
          title="Arms"
          nameKey={"Tree"}
          valueKey={"Arms Skills"}
          selectedGrade={selectedArmsGrade}
          bind:selectedValue={selectedArms}
          filter={searchText}
        />
      {/if}
      {#if isWaistEnabled}
        <SelectWeapon
          list={armors}
          title="Waist"
          nameKey={"Tree"}
          valueKey={"Waist Skills"}
          selectedGrade={selectedWaistGrade}
          bind:selectedValue={selectedWaist}
          filter={searchText}
        />
      {/if}
      {#if isLegsEnabled}
        <SelectWeapon
          list={armors}
          title="Legs"
          nameKey={"Tree"}
          valueKey={"Legs Skills"}
          selectedGrade={selectedLegsGrade}
          bind:selectedValue={selectedLegs}
          filter={searchText}
        />
      {/if}
    </div>
  </div>
</div>