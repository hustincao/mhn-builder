<script>
    export let selectedValue = "";
    export let list = [];
    export let nameKey = "";
    export let valueKey = "";
</script>

<div class="flex overflow-x-scroll whitespace-nowrap gap-x-4">
    {#each list as armor}
        <div class="flex flex-col"> 
            <button on:click={()=>{selectedValue = armor[nameKey]}}>{armor[nameKey]}</button>
            {#each armor[valueKey].split("\n") as skill}
                <p>{skill}</p>
            {/each}
        </div>
    {/each}
</div>
