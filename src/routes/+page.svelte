<script>
  // Main app page.
  // Holds main player data and controls all API calls/fetches.

  import {setContext, onMount} from 'svelte';
  import { writable } from 'svelte/store';
  import Set from "./set.svelte";

  const armors = writable([]);
  // let armors = await fetch("/armors.json").then((r) => r.json());
  setContext('armors', armors);
  onMount(async ()=>{
    console.log(await fetch("/armors.json").then((r) => r.json()))
    armors.set(await fetch("/armors.json").then((r) => r.json()));
  });

  // A constant object that represents all the data a user can change for a set
  const PLAYER_SET_OBJECT = {
    Weapon: {},
    Helm: {},
    Mail: {},
    Arms: {},
    Waist: {},
    Legs: {},
  };

  let user_sets = [{ ...PLAYER_SET_OBJECT }];
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
      <p>Report bugs or issues</p>
    </a>
  </div>
  <div
    class="flex flex-row flex-wrap md:flex-nowrap gap-3 w-full max-w-screen-lg"
  >
    {#each user_sets as set}
      <Set {set} />
    {/each}
  </div>
</div>
