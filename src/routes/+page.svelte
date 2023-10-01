<script>
    import { ToggleButton, CheckBox, SelectArmor, Armors } from "$lib";
    const armors = [
        {
            "Armor Set": "Leather Set",
            "Minimum Grade": 1,
            "Helm Skills":
                "Critical Eye Lv.1 (Grade 2)\nIce Resistance Lv.1 (Grade 4)",
            "Mail Skills":
                "Attack Boost Lv.1 (Grade 2)\nFire Resistance Lv.1 (Grade 4)",
            "Arms Skills":
                "Defense Boost Lv.1 (Grade 2)\nThunder Resistance Lv.1 (Grade 4)",
            "Waist Skills":
                "Health Boost Lv.1 (Grade 2)\nWater Resistance Lv.1 (Grade 4)",
            "Legs Skills":
                "Poison Resistance Lv.1 (Grade 2)\nParalysis Resistance Lv.1 (Grade 4)",
        },
        {
            "Armor Set": "Jagras Set",
            "Minimum Grade": 1,
            "Helm Skills":
                "Firm Foothold Lv.1 (Grade 2)\nFirm Foothold Lv.2 (Grade 6)",
            "Mail Skills":
                "Rising Tide Lv.1 (Grade 2)\nRising Tide Lv.2 (Grade 6)",
            "Arms Skills":
                "Firm Foothold Lv.1 (Grade 2)\nWater Attack Lv.1 (Grade 4)",
            "Waist Skills":
                "Fortify Lv.1 (Grade 2)\nRising Tide Lv.1 (Grade 4)\nFortify Lv.2 (Grade 6)",
            "Legs Skills":
                "Water Attack Lv.1 (Grade 2)\nWater Attack Lv.2 (Grade 6)",
        },
        {
            "Armor Set": "Kulu Set",
            "Minimum Grade": 1,
            "Helm Skills":
                "Lock On Lv.1 (Grade 2)\nCritical Eye Lv.1 (Grade 4)",
            "Mail Skills": "Guts Lv. 1 (Grade 2)\nGuts Lv. 2 (Grade 6)",
            "Arms Skills":
                "Last Stand Lv.1 (Grade 2)\nCritical Eye Lv.1 (Grade 4)",
            "Waist Skills":
                "Last Stand Lv.1 (Grade 2)\nEvade Extender Lv.1 (Grade 4)",
            "Legs Skills":
                "Critical Eye Lv.1 (Grade 2)\nCritical Eye Lv.2 (Grade 6)",
        },
        {
            "Armor Set": "Pukei Set",
            "Minimum Grade": 1,
            "Helm Skills":
                "Focus Lv.1 (Grade 2)\nHealth Boost Lv.1 (Grade 4)\nHealth Boost Lv.2 (Grade 6)",
            "Mail Skills": "Poison Resist Lv.1 (Grade 2)\nFocus Lv.1 (Grade 4)",
            "Arms Skills":
                "Poison Attack Lv.1 (Grade 2)\nPoison Resistance Lv.1 (Grade 4)",
            "Waist Skills":
                "Poison Attack Lv.1 (Grade 2)\nPoison Attack Lv.2 (Grade 6)",
            "Legs Skills":
                "Health Resistance Lv.1 (Grade 2)\nPoison Resistance Lv.1 (Grade 4)",
        },
    ];
    let isWeaponEnabled = false;
    let isHelmEnabled = false;
    let isMailEnabled = false;
    let isArmsEnabled = false;
    let isWaistEnabled = false;
    let isLegsEnabled = false;
    let searchText = "";

    let selectedHelm = "";
    let selectedMail = "";
    let selectedArms = "";
    let selectedWaist = "";
    let selectedLegs = "";
    let skills = [];

    $:{
        skills = [
            ...(selectedHelm ? armors.find((a) => a["Armor Set"] === selectedHelm)["Helm Skills"].split("\n") : []),
            ...(selectedMail ? armors.find((a) => a["Armor Set"] === selectedMail)["Mail Skills"].split("\n") : []),
            ...(selectedArms ? armors.find((a) => a["Armor Set"] === selectedArms)["Arms Skills"].split("\n") : []),
            ...(selectedWaist ? armors.find((a) => a["Armor Set"] === selectedWaist)["Waist Skills"].split("\n") : []),
            ...(selectedLegs ? armors.find((a) => a["Armor Set"] === selectedLegs)["Legs Skills"].split("\n") : []),
    ]
    }
</script>

<div class="flex flex-row h-screen w-screen">
    <div class="flex flex-col justify-center w-1/2">
        <div class="bg-green-200">
            <p>Health: 0</p>
            <p>Defense: 0</p>
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
            <p>Skills: {skills}</p>
        </div>
    </div>
    <div class="flex flex-col justify-center w-1/2 bg-pink-200">
        <div>
            Selected Helm: {selectedHelm}
            Selected Mail: {selectedMail}
            Selected Arms: {selectedArms}
            Selected Waist: {selectedWaist}
            Selected Legs: {selectedLegs}
        </div>
        <input bind:value={searchText} type="text" placeholder="Search name, skills, monster..."/>
        <div class="flex gap-x-3">
            <CheckBox label={"Weapon"} bind:isEnabled={isWeaponEnabled}/>
            <CheckBox label={"Helm"} bind:isEnabled={isHelmEnabled} />
            <CheckBox label={"Mail"} bind:isEnabled={isMailEnabled} />
            <CheckBox label={"Arms"} bind:isEnabled={isArmsEnabled} />
            <CheckBox label={"Waist"} bind:isEnabled={isWaistEnabled} />
            <CheckBox label={"Legs"} bind:isEnabled={isLegsEnabled} />
        </div>
        <div class="bg-red-400">
            <!-- {armors} -->
            <SelectArmor list={armors} nameKey={"Armor Set"} valueKey={"Helm Skills"} bind:selectedValue={selectedHelm}/>
            <SelectArmor list={armors} nameKey={"Armor Set"} valueKey={"Mail Skills"} bind:selectedValue={selectedMail}/>
            <SelectArmor list={armors} nameKey={"Armor Set"} valueKey={"Arms Skills"} bind:selectedValue={selectedArms}/>
            <SelectArmor list={armors} nameKey={"Armor Set"} valueKey={"Waist Skills"} bind:selectedValue={selectedWaist}/>
            <SelectArmor list={armors} nameKey={"Armor Set"} valueKey={"Legs Skills"} bind:selectedValue={selectedLegs}/>
        </div>
    </div>
</div>
