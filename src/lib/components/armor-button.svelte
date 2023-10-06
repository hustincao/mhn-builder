<script>
    import { getSkillLevelGrade } from "$lib/utils";
    export let armorName;
    export let armorSkills; // Comes in as a single string
    export let element;
    export let isSelected = false;
    export let onClick;
    export let selectedGrade;

    const x_icon = `<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>`;
</script>

<button
    class={"hover:bg-slate-400 rounded-lg p-2 " +
        (isSelected && "bg-slate-100")}
    on:click={onClick}
>
    <div class="flex flex-col justify-start h-full">
        <div class="font-bold flex w-full justify-center gap-x-2">{armorName} 
            {#if element} 
            <img class="h-5 w-5" src={`/element-icons/element-${element.toLowerCase()}.webp`} alt={`Element ${element} Icon`}  />
            {/if}
        </div>
        {#each armorSkills.split("\n") as skill}
            {@const { name, level, grade } = getSkillLevelGrade(skill)}
            <p
                class={"flex items-center " +
                    (grade > selectedGrade && "font-normal line-through")}
            >
                {#if grade > selectedGrade}
                    <svg class="h-4 w-4 fill-red-500" viewBox="0 0 384 512"
                        >{@html x_icon}</svg
                    >
                {/if}
                {skill}
            </p>
        {/each}
    </div>
</button>
