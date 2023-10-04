<script>
    import {ArmorButton} from "$lib";
    export let selectedValue = {};
    export let list = [];
    export let nameKey = "";
    export let valueKey = "";
    export let selectedGrade = 10;
    export let filter = "";

    $: isFiltered = (armor) => {
        return (
            armor[valueKey].toLowerCase().includes(filter.toLowerCase()) ||
            armor[nameKey].toLowerCase().includes(filter.toLowerCase())
        );
    };
</script>

<div class="flex overflow-x-scroll whitespace-nowrap gap-x-4 bg-slate-300 p-2 border-b-2 border-slate-500">
    {#each list as armor}
        {#if isFiltered(armor)}
            <ArmorButton armorName={armor[nameKey]} armorSkills={armor[valueKey]} isSelected={selectedValue === armor} selectedGrade={selectedGrade} onClick={()=>{selectedValue = armor}} />
        {/if}
    {/each}
</div>
