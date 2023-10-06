<script>
    export let label = "";
    export let isEnabled = false;

    const styles = {
        active: "bg-slate-400 hover:bg-slate-300",
        inactive: "bg-slate-50 hover:bg-slate-300",
    };
</script>

<button class={"flex hover:bg-slate-400 items-center gap-x-1 rounded-lg px-2 " + (isEnabled && "bg-slate-50")} on:click={()=>{isEnabled = !isEnabled}}>
    <input class="accent-slate-900" type="checkbox" id={label} checked={isEnabled}/>
    {label}
</button>