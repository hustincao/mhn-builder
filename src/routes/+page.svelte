<script>
    import { CheckBox, SelectArmor } from "$lib";
    import {getSkillLevelGrade} from "$lib/utils";
    import { onMount } from "svelte";
    let armors;
    const armorGrades = [20, 34, 49, 65, 82, 100, 119, 139, 160, 182];

    let selectedHelm = "";
    let selectedMail = "";
    let selectedArms = "";
    let selectedWaist = "";
    let selectedLegs = "";

    onMount(async () => {
        armors = await fetch("/armors.json").then((r) => r.json());

        selectedHelm = armors[0]["Armor Set"];
        selectedMail = armors[0]["Armor Set"];
        selectedArms = armors[0]["Armor Set"];
        selectedWaist = armors[0]["Armor Set"];
        selectedLegs = armors[0]["Armor Set"];
    });

    $: defense =
        armorGrades[selectedHelmGrade - 1] +
        armorGrades[selectedMailGrade - 1] +
        armorGrades[selectedArmsGrade - 1] +
        armorGrades[selectedWaistGrade - 1] +
        armorGrades[selectedLegsGrade - 1];

    let isShowMoreOptions = false;

    let isWeaponEnabled = false;
    let isHelmEnabled = true;
    let isMailEnabled = true;
    let isArmsEnabled = true;
    let isWaistEnabled = true;
    let isLegsEnabled = true;

    let selectedHelmGrade = 10;
    let selectedMailGrade = 10;
    let selectedArmsGrade = 10;
    let selectedWaistGrade = 10;
    let selectedLegsGrade = 10;

    let searchText = "";

    let equippedSkills = {};


    function getSkills(inputSkills, grade) {
        let skills = inputSkills.split("\n");
        let tempSkills = {};
        for (let i = 0; i < skills.length; i++) {
            let skill = skills[i];
            let {name, level, grade} = getSkillLevelGrade(skill);
            console.log(name, level, grade);
            tempSkills[name] = level;
        }
        return tempSkills;
    }

    $: {
        equippedSkills = {};

        if (selectedHelm) {
            let armor = armors.find((a) => a["Armor Set"] === selectedHelm);
            for (const [skill, level] of Object.entries(
                getSkills(armor["Helm Skills"], 10)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedMail) {
            let armor = armors.find((a) => a["Armor Set"] === selectedMail);
            for (const [skill, level] of Object.entries(
                getSkills(armor["Mail Skills"], 10)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedArms) {
            let armor = armors.find((a) => a["Armor Set"] === selectedArms);
            for (const [skill, level] of Object.entries(
                getSkills(armor["Arms Skills"], 10)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedWaist) {
            let armor = armors.find((a) => a["Armor Set"] === selectedWaist);
            for (const [skill, level] of Object.entries(
                getSkills(armor["Waist Skills"], 10)
            )) {
                if (skill in equippedSkills) equippedSkills[skill] += level;
                else equippedSkills[skill] = level;
            }
        }

        if (selectedLegs) {
            let armor = armors.find((a) => a["Armor Set"] === selectedLegs);
            for (const [skill, level] of Object.entries(
                getSkills(armor["Legs Skills"], 10)
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
            <p>Attack: 0</p>
            <p>Affinity: 0</p>
            <p>Poison: 0</p>
            <p>Paralysis: 0</p>
            <p>Fire: 0</p>
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
            <div class="flex">
                <div class="flex">
                    <label class="whitespace-nowrap" for="helm-grade"
                        >Helm Grade</label
                    >
                    <input
                        bind:value={selectedHelmGrade}
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
            {#if isHelmEnabled}
                <SelectArmor
                    list={armors}
                    nameKey={"Armor Set"}
                    valueKey={"Helm Skills"}
                    selectedGrade={selectedHelmGrade}
                    bind:selectedValue={selectedHelm}
                    filter={searchText}
                />
            {/if}
            {#if isMailEnabled}
                <SelectArmor
                    list={armors}
                    nameKey={"Armor Set"}
                    valueKey={"Mail Skills"}
                    selectedGrade={selectedMailGrade}
                    bind:selectedValue={selectedMail}
                    filter={searchText}
                />
            {/if}
            {#if isArmsEnabled}
                <SelectArmor
                    list={armors}
                    nameKey={"Armor Set"}
                    valueKey={"Arms Skills"}
                    selectedGrade={selectedArmsGrade}
                    bind:selectedValue={selectedArms}
                    filter={searchText}
                />
            {/if}
            {#if isWaistEnabled}
                <SelectArmor
                    list={armors}
                    nameKey={"Armor Set"}
                    valueKey={"Waist Skills"}
                    selectedGrade={selectedWaistGrade}
                    bind:selectedValue={selectedWaist}
                    filter={searchText}
                />
            {/if}
            {#if isLegsEnabled}
                <SelectArmor
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
