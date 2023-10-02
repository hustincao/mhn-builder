<script>
    import {ArmorButton} from "$lib";
    export let selectedValue = "";
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

<div class="flex overflow-x-scroll whitespace-nowrap gap-x-4">
    {#each list as armor}
        {#if isFiltered(armor)}
            <ArmorButton armorName={armor[nameKey]} armorSkills={armor[valueKey]} isSelected={selectedValue === armor[nameKey]} selectedGrade={selectedGrade} onClick={()=>{selectedValue = armor[nameKey]}} />
            <!-- <button class={"hover:bg-slate-400 " + (selectedValue === armor[nameKey] && "bg-green-300")}
                on:click={() => {
                    selectedValue = armor[nameKey];
                }}
            >
                <div class="flex flex-col">
                    {armor[nameKey]}
                    {#each armor[valueKey].split("\n") as skill}
                        <p>{skill}</p>
                    {/each}
                </div>
            </button> -->
        {/if}
    {/each}
</div>
