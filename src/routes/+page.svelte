<script>
    import { CheckBox, SelectWeapon } from "$lib";
    import Tooltip from "$lib/components/tooltip.svelte";
    import { getSkillLevelGrade } from "$lib/utils";
    import { onMount } from "svelte";
    let armors, swordandshields, hammers, greatswords, longswords, skills;
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
            default:
                return [];
        }
    })();

    let equippedSkills = {};

    function getSkills(inputSkills, inputGrade) {
        if (!inputSkills) return {};
        let skills = inputSkills.split("\n");
        let tempSkills = {};
        for (let i = 0; i < skills.length; i++) {
            let skill = skills[i];
            let { name, level, grade } = getSkillLevelGrade(skill);
            if (grade > inputGrade) break;
            tempSkills[name] = level;
        }
        return tempSkills;
    }

    $: {
        if (selectedWeapon["Minimum Grade"] > selectedWeaponGrade) {
            selectedWeaponGrade = selectedWeapon["Minimum Grade"];
        }
    }

    $: {
        equippedSkills = {};
        if (selectedWeapon) {
            for (const [skill, level] of Object.entries(
                getSkills(
                    selectedWeapon["Equipment Skills"],
                    selectedWeaponGrade
                )
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedHelm) {
            // let armor = armors.find((a) => a["Armor Set"] === selectedHelm);
            for (const [skill, level] of Object.entries(
                getSkills(selectedHelm["Helm Skills"], selectedHelmGrade)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedMail) {
            // let armor = armors.find((a) => a["Armor Set"] === selectedMail);
            for (const [skill, level] of Object.entries(
                getSkills(selectedMail["Mail Skills"], selectedMailGrade)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedArms) {
            // let armor = armors.find((a) => a["Armor Set"] === selectedArms);
            for (const [skill, level] of Object.entries(
                getSkills(selectedArms["Arms Skills"], selectedArmsGrade)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedWaist) {
            // let armor = armors.find((a) => a["Armor Set"] === selectedWaist);
            for (const [skill, level] of Object.entries(
                getSkills(selectedWaist["Waist Skills"], selectedWaistGrade)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedLegs) {
            // let armor = armors.find((a) => a["Armor Set"] === selectedLegs);
            for (const [skill, level] of Object.entries(
                getSkills(selectedLegs["Legs Skills"], selectedLegsGrade)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }
    }
</script>

<div class="flex flex-col items-center min-h-screen w-screen bg-slate-700">
    <h1 class="text-3xl my-4 font-bold text-slate-300">
        Monster Hunter Now Set Builder
    </h1>
    <!-- <Tooltip label="label" description="Description"/> -->
    <div class="flex flex-col gap-3 lg:flex-row w-full max-w-screen-lg">
        <div class="bg-slate-300 p-3 rounded-lg">
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
        <div class="bg-slate-300 p-3 rounded-lg">
            <p class="text-center font-bold text-lg mb-4">Skills</p>
            <div class="flex gap-x-2 gap-y-2 relative">
                <div class="flex flex-col gap-y-2">
                    {#each Object.entries(equippedSkills).sort() as [name, level]}
                        <!-- <p>{name}</p> -->
                        {@const skill = skills.find((s) => s["Name"] === name)}
                        <Tooltip
                            label={name}
                            description={skill["Description"]}
                        />
                    {/each}
                </div>
                <div class="flex flex-col gap-y-2">
                    {#each Object.entries(equippedSkills).sort() as [name, level]}
                        {@const skill = skills.find((s) => s["Name"] === name)}
                        <!-- <p>{level} / {skill["Maximum Level"]}</p> -->
                        <Tooltip
                            label={`<p class="whitespace-nowrap">${level} / ${skill["Maximum Level"]}</p>`}
                            description={(() => {
                                const descriptions =
                                    skill["Level Descriptions"].split(";");
                                const l = Math.min(
                                    level,
                                    descriptions.length - 1
                                );
                                return (
                                    '<ul class="list-decimal list-inside">' +
                                    descriptions
                                        .map(
                                            (d, i, r) =>
                                                `<li class="${
                                                    i !== l - 1 &&
                                                    "text-slate-400"
                                                }">${d}</li>`
                                        )
                                        .join("") +
                                    "</ul>"
                                );
                            })()}
                        />
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <div
        class="flex flex-col w-full max-w-screen-lg min-h-[838px] bg-slate-300 rounded-lg mt-3"
    >
        <div class="flex px-3 pt-3 gap-x-3">
            <input
                class="grow rounded-md p-2 text-lg"
                bind:value={searchText}
                type="text"
                placeholder="Search name, skills, monster..."
            />
            <button
                class="p-2 bg-slate-100 rounded-md"
                on:click={() => {
                    isShowMoreOptions = !isShowMoreOptions;
                }}
            >
                {isShowMoreOptions ? "Hide" : "Show"} More Options</button
            >
        </div>
        {#if isShowMoreOptions}
            <div class="grid grid-cols-6 px-3 gap-x-3">
                <div
                    class="col-span-1 flex flex-col rounded-md border-slate-300"
                >
                    <label
                        class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
                        for="weapon-grade">Weapon Grade</label
                    >
                    <input
                        bind:value={selectedWeaponGrade}
                        class="w-full ps-2"
                        id="weapon-grade"
                        type="number"
                        min={selectedWeapon["Minimum Grade"]}
                        max="10"
                    />
                </div>
                <div
                    class="col-span-1 flex flex-col rounded-md border-slate-300"
                >
                    <label
                        class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
                        for="helm-grade">Helm Grade</label
                    >
                    <input
                        bind:value={selectedHelmGrade}
                        class="w-full ps-2"
                        id="helm-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
                <div
                    class="col-span-1 flex flex-col rounded-md border-slate-300"
                >
                    <label
                        class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
                        for="mail-grade">Mail Grade</label
                    >
                    <input
                        bind:value={selectedMailGrade}
                        class="w-full ps-2"
                        id="mail-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
                <div
                    class="col-span-1 flex flex-col rounded-md border-slate-300"
                >
                    <label
                        class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
                        for="arms-grade">Arms Grade</label
                    >
                    <input
                        bind:value={selectedArmsGrade}
                        class="w-full ps-2"
                        id="arms-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
                <div
                    class="col-span-1 flex flex-col rounded-md border-slate-300"
                >
                    <label
                        class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
                        for="waist-grade">Waist Grade</label
                    >
                    <input
                        bind:value={selectedWaistGrade}
                        class="w-full ps-2"
                        id="waist-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
                <div
                    class="col-span-1 flex flex-col rounded-md border-slate-300"
                >
                    <label
                        class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
                        for="legs-grade">Legs Grade</label
                    >
                    <input
                        bind:value={selectedLegsGrade}
                        class="w-full ps-2"
                        id="legs-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
            </div>
        {/if}
        <div class="flex gap-x-3 p-3">
            <select class="rounded-md" bind:value={selectedWeaponCategory}>
                <option class="hover:bg-slate-500" value="Sword and Shield"
                    >Sword and Shield</option
                >
                <option value="Hammer">Hammer</option>
                <option value="Great Sword">Great Swords</option>
                <option value="Long Sword">Long Sword</option>
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
                    nameKey={"Armor Set"}
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
                    nameKey={"Armor Set"}
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
                    nameKey={"Armor Set"}
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
                    nameKey={"Armor Set"}
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
                    nameKey={"Armor Set"}
                    valueKey={"Legs Skills"}
                    selectedGrade={selectedLegsGrade}
                    bind:selectedValue={selectedLegs}
                    filter={searchText}
                />
            {/if}
        </div>
    </div>
</div>

<style>
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        opacity: 1;
    }
</style>
