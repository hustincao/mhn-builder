<script>
  import Stats from "./stats.svelte";
  import Skills from "./skills.svelte";
  import EquippedSet from "./equipped-set.svelte";

  // Component that holds and allows user to change a single set
  export let set;
  export let setLength;
  export let index;
  export let deleteSet; // function to delete a set;
  export let moveSetUp; // function to move set up
  export let moveSetDown; // function to move set down
</script>

<div
  class="flex flex-row flex-wrap md:flex-nowrap gap-2 w-full max-w-screen-lg "
>

  <Stats bind:set {deleteSet} {moveSetUp} {moveSetDown} {index} {setLength}/>
  <Skills bind:set />
  <EquippedSet bind:set />
</div>
