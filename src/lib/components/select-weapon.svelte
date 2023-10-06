<script>
    import { ArmorButton } from "$lib";
    export let selectedValue = {};
    export let list = [];
    export let nameKey = "";
    export let valueKey = "";
    export let selectedGrade = 10;
    export let filter = "";
    export let title = "";

    $: filteredList = list.filter((a) => isFiltered(a));

    $: isFiltered = (armor) => {
        return (
            armor[valueKey].toLowerCase().includes(filter.toLowerCase()) ||
            armor[nameKey].toLowerCase().includes(filter.toLowerCase()) ||
            armor["Monster"].toLowerCase().includes(filter.toLowerCase())
        );
    };
</script>

<div>
    <p class="font-bold text-center text-lg">{title}</p>
    <div
        class="flex overflow-x-scroll whitespace-nowrap gap-x-4 bg-slate-300 p-2 border-b-2 border-slate-500"
    >
        {#if filteredList.length === 0}
            <p class="italic text-center">No {title} found</p>
        {/if}
        {#each filteredList as armor}
            <ArmorButton
                armorName={armor[nameKey]}
                armorSkills={armor[valueKey]}
                element={"Element" in armor && armor["Element"] !== "None" ? armor["Element"] : ""}
                isSelected={selectedValue === armor}
                {selectedGrade}
                onClick={() => {
                    selectedValue = armor;
                }}
            />
        {/each}
    </div>
</div>
