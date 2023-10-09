<script>
  // Main app page.
  // Holds main player data and controls all API calls/fetches.

  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import Set from "./single-set.svelte";


  let errors = [];

  const armors = writable([]);
  setContext("armors", armors);

  const skills = writable([]);
  setContext("skills", skills);

  const swordandshields = writable([]);
  setContext("swordandshields", swordandshields);

  const greatswords = writable([]);
  setContext("greatswords", greatswords);

  const longswords = writable([]);
  setContext("longswords", longswords);

  const hammers = writable([]);
  setContext("hammers", hammers);

  const bows = writable([]);
  setContext("bows", bows);

  const lightbowguns = writable([]);
  setContext("lightbowguns", lightbowguns);

  onMount(async () => {
    Promise.all([
      fetch("/armors.json")
        .then((r) => r.json())
        .then((j) => armors.set(j))
        .catch(() => {
          errors = [...errors, "Error getting /armors.json"];
        }),
      fetch("/skills.json")
        .then((r) => r.json())
        .then((j) => skills.set(j))
        .catch(() => {
          errors = [...errors, "Error getting /skills.json"];
        }),
      fetch("/sword-and-shields.json")
        .then((r) => r.json())
        .then((j) => swordandshields.set(j))
        .catch(() => {
          errors = [...errors, "Error getting /sword-and-shields.json"];
        }),
      fetch("/great-swords.json")
        .then((r) => r.json())
        .then((j) => greatswords.set(j))
        .catch(() => {
          errors = [...errors, "Error getting /great-swords.json"];
        }),
      fetch("/long-swords.json")
        .then((r) => r.json())
        .then((j) => longswords.set(j))
        .catch(() => {
          errors = [...errors, "Error getting /long-swords.json"];
        }),
      fetch("/hammers.json")
        .then((r) => r.json())
        .then((j) => hammers.set(j))
        .catch(() => {
          errors = [...errors, "Error getting /hammers.json"];
        }),
      fetch("/bows.json")
        .then((r) => r.json())
        .then((j) => bows.set(j))
        .catch(() => {
          errors = [...errors, "Error getting /bows.json"];
        }),
      fetch("/light-bow-guns.json")
        .then((r) => r.json())
        .then((j) => lightbowguns.set(j))
        .catch(() => {
          errors = [...errors, "Error getting /light-bow-guns.json"];
        }),
    ]).then(() => {
      if (localStorage.getItem("user_sets")) {
        const localStorage_sets = JSON.parse(localStorage.getItem("user_sets"));
        user_sets = localStorage_sets.map((set) => {
          const s = { ...PLAYER_SET_OBJECT };
          if (set.Weapon !== "") {
            s.Weapon =
              $swordandshields.find(
                (weapon) => weapon["Tree"] === set.Weapon
              ) ||
              $greatswords.find((weapon) => weapon["Tree"] === set.Weapon) ||
              $longswords.find((weapon) => weapon["Tree"] === set.Weapon) ||
              $hammers.find((weapon) => weapon["Tree"] === set.Weapon) ||
              $bows.find((weapon) => weapon["Tree"] === set.Weapon) ||
              $lightbowguns.find((weapon) => weapon["Tree"] === set.Weapon);
          }

          if (set.Helm !== "")
            s.Helm = $armors.find((armor) => armor["Tree"] === set.Helm);
          if (set.Mail !== "")
            s.Mail = $armors.find((armor) => armor["Tree"] === set.Mail);
          if (set.Arms !== "")
            s.Arms = $armors.find((armor) => armor["Tree"] === set.Arms);

          if (set.Waist !== "")
            s.Waist = $armors.find((armor) => armor["Tree"] === set.Waist);
          if (set.Legs !== "")
            s.Legs = $armors.find((armor) => armor["Tree"] === set.Legs);

          s.WeaponGrade = set.WeaponGrade;
          s.HelmGrade = set.HelmGrade;
          s.MailGrade = set.MailGrade;
          s.ArmsGrade = set.ArmsGrade;
          s.WaistGrade = set.WaistGrade;
          s.LegsGrade = set.LegsGrade;
          return s;
        });
      }

      // Assign function to store to local storage
      storeToLocalStorage = (user_sets) => {
        let localStorage_sets = [];
        for (const user_set of user_sets) {
          localStorage_sets.push({
            Weapon: "Tree" in user_set.Weapon ? user_set.Weapon["Tree"] : "",
            WeaponGrade: user_set.WeaponGrade,
            Helm: "Tree" in user_set.Helm ? user_set.Helm["Tree"] : "",
            HelmGrade: user_set.HelmGrade,
            Mail: "Tree" in user_set.Mail ? user_set.Mail["Tree"] : "",
            MailGrade: user_set.MailGrade,
            Arms: "Tree" in user_set.Arms ? user_set.Arms["Tree"] : "",
            ArmsGrade: user_set.ArmsGrade,
            Waist: "Tree" in user_set.Waist ? user_set.Waist["Tree"] : "",
            WaistGrade: user_set.WaistGrade,
            Legs: "Tree" in user_set.Legs ? user_set.Legs["Tree"] : "",
            LegsGrade: user_set.LegsGrade,
          });
        }

        localStorage.setItem("user_sets", JSON.stringify(localStorage_sets));
      };
    });
  });

  const MODAL_SETTINGS = {
    selectedWeaponCategory: "swordandshields",
    isEnabled: {
      Weapon: true,
      Helm: true,
      Mail: true,
      Arms: true,
      Waist: true,
      Legs: true,
    },
  };

  const modal_settings = writable({ ...MODAL_SETTINGS });
  setContext("modal_settings", modal_settings);

  // A constant object that represents all the data a user can change for a set
  const PLAYER_SET_OBJECT = {
    Weapon: {},
    WeaponGrade: 1,
    Helm: {},
    HelmGrade: 1,
    Mail: {},
    MailGrade: 1,
    Arms: {},
    ArmsGrade: 1,
    Waist: {},
    WaistGrade: 1,
    Legs: {},
    LegsGrade: 1,
  };

  // let user_sets = [{ ...PLAYER_SET_OBJECT }];
  let user_sets = [{ ...PLAYER_SET_OBJECT }];
  let storeToLocalStorage; // function to store to local storage. gets assigned onMount

  $: {
    if (storeToLocalStorage) {
      storeToLocalStorage(user_sets);
    }
  }

  function addSet() {
    user_sets = [...user_sets, { ...PLAYER_SET_OBJECT }];
  }
  function duplicate(i){
    user_sets = [...user_sets, {...user_sets[i]}];
  }
  function moveSetUp(i) {
    const set = { ...user_sets[i] };
    user_sets[i] = user_sets[i - 1];
    user_sets[i - 1] = set;
  }
  function moveSetDown(i) {
    const set = { ...user_sets[i] };
    user_sets[i] = user_sets[i + 1];
    user_sets[i + 1] = set;
  }
  function deleteSet(i) {
    user_sets.splice(i, 1);
    user_sets = user_sets;
  }
</script>

<div class="flex flex-col items-center min-h-screen gap-y-12 py-8 bg-slate-700">
  <div class="flex w-full max-w-screen-lg justify-between flex-wrap px-3">
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
      <p>Report bugs or issues</p>
    </a>
  </div>
  {#each errors as error}
    <p class="text-red-600 font-bold">{error}</p>
  {/each}
  {#if errors.length === 0}
      {#each user_sets as set, index}
        <Set
          bind:set
          {duplicate}
          {deleteSet}
          {moveSetUp}
          {moveSetDown}
          {index}
          setLength={user_sets.length}
        />
      {/each}
  {/if}
  <button
    class="bg-slate-50 flex w-full max-w-screen-lg rounded-lg justify-center font-bold p-3 hover:bg-slate-400"
    on:click={addSet}>Add another set</button
  >
</div>
