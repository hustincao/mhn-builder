<script>
    import Stats from "./stats.svelte";
    import Skills from "./skills.svelte";
    import EquippedSet from "./equipped-set.svelte";

    // Component that holds and allows user to change a single set
    export let set;
</script>

<Stats {set} />
<Skills />
<EquippedSet {set} />
