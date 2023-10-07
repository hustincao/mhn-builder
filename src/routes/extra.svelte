<script>
    import { onMount, afterUpdate } from "svelte";
    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
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
  
    let updateTooltips = []; // Observer pattern to update tooltip positions
  
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
  
    afterUpdate(() => {
      updateTooltips.forEach((u) => u());
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
  