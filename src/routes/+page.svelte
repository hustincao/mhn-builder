<script>
    import { CheckBox, SelectArmor, SelectWeapon } from "$lib";
    import { getSkillLevelGrade } from "$lib/utils";
    import { onMount } from "svelte";
    let armors, swordandshields;
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
        selectedWeapon = swordandshields[0];
        selectedHelm = armors[0];
        selectedMail = armors[0];
        selectedArms = armors[0];
        selectedWaist = armors[0];
        selectedLegs = armors[0];
    });

    $: attack = selectedWeapon?.hasOwnProperty("Attacks")
        ? selectedWeapon["Attacks"].split(",")[
              selectedWeaponGrade - selectedWeapon["Minimum Grade"]
          ]
        : 0;

    // $: special_attack =
    //     selectedWeapon?.hasOwnProperty("Element") &&
    //     selectedWeapon["Element"] !== "None"
    //         ? selectedWeapon["Special Attacks"].split(",")[
    //               selectedWeaponGrade - selectedWeapon["Minimum Grade"]
    //           ]
    //         : 0;
    $: fire_attack =
        selectedWeapon?.hasOwnProperty("Element") &&
        selectedWeapon["Element"] === "Fire"
            ? selectedWeapon["Special Attacks"].split(",")[
                  selectedWeaponGrade - selectedWeapon["Minimum Grade"]
              ]
            : 0;

    $: defense =
        armorGrades[selectedHelmGrade - 1] +
        armorGrades[selectedMailGrade - 1] +
        armorGrades[selectedArmsGrade - 1] +
        armorGrades[selectedWaistGrade - 1] +
        armorGrades[selectedLegsGrade - 1];

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

    let equippedSkills = {};

    function getSkills(inputSkills, grade) {
        if (!inputSkills) return {};
        let skills = inputSkills.split("\n");
        let tempSkills = {};
        for (let i = 0; i < skills.length; i++) {
            let skill = skills[i];
            let { name, level, grade } = getSkillLevelGrade(skill);
            // console.log(name, level, grade);
            tempSkills[name] = level;
        }
        return tempSkills;
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

<div class="flex flex-row h-screen w-screen">
    <div class="flex flex-col justify-center w-1/2">
        <div class="bg-green-200">
            <p>Health: 0</p>
            <p>Defense: {defense}</p>
            <p>Attack: {attack}</p>
            <p>Affinity: 0</p>
            <p>Poison: 0</p>
            <p>Paralysis: 0</p>
            <p>Fire: {fire_attack}</p>
            <p>Water: 0</p>
            <p>Thunder: 0</p>
            <p>Ice: 0</p>
        </div>
        <div class="bg-cyan-200">
            <p>Skills:</p>
            {#each Object.entries(equippedSkills) as [skill, level]}
                <p>{skill}: {level}</p>
            {/each}
        </div>
    </div>
    <div class="flex flex-col justify-center w-1/2 bg-pink-200">
        <div class="flex">
            <input
                class="grow"
                bind:value={searchText}
                type="text"
                placeholder="Search name, skills, monster..."
            />
            <button
                on:click={() => {
                    isShowMoreOptions = !isShowMoreOptions;
                }}>Show More Options</button
            >
        </div>
        {#if isShowMoreOptions}
            <div class="flex flex-wrap gap-2 my-2">
                <div class="flex">
                    <label class="whitespace-nowrap" for="helm-grade"
                        >Helm Grade</label
                    >
                    <input
                        bind:value={selectedHelmGrade}
                        class="w-10"
                        id="helm-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
                <div class="flex">
                    <label class="whitespace-nowrap" for="mail-grade"
                        >Mail Grade</label
                    >
                    <input
                        bind:value={selectedMailGrade}
                        class="w-10"
                        id="mail-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
                <div class="flex">
                    <label class="whitespace-nowrap" for="arms-grade"
                        >Arms Grade</label
                    >
                    <input
                        bind:value={selectedArmsGrade}
                        class="w-10"
                        id="arms-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
                <div class="flex">
                    <label class="whitespace-nowrap" for="waist-grade"
                        >Waist Grade</label
                    >
                    <input
                        bind:value={selectedWaistGrade}
                        class="w-10"
                        id="waist-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
                <div class="flex">
                    <label class="whitespace-nowrap" for="legs-grade"
                        >Legs Grade</label
                    >
                    <input
                        bind:value={selectedLegsGrade}
                        class="w-10"
                        id="legs-grade"
                        type="number"
                        min="1"
                        max="10"
                    />
                </div>
            </div>
        {/if}
        <div class="flex gap-x-3">
            <CheckBox label={"Weapon"} bind:isEnabled={isWeaponEnabled} />
            <CheckBox label={"Helm"} bind:isEnabled={isHelmEnabled} />
            <CheckBox label={"Mail"} bind:isEnabled={isMailEnabled} />
            <CheckBox label={"Arms"} bind:isEnabled={isArmsEnabled} />
            <CheckBox label={"Waist"} bind:isEnabled={isWaistEnabled} />
            <CheckBox label={"Legs"} bind:isEnabled={isLegsEnabled} />
        </div>
        <div class="bg-red-400">
            {#if isWeaponEnabled}
                <SelectWeapon
                    list={swordandshields}
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
