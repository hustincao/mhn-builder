<script>
    export let label = "";
    export let isEnabled = false;

    const styles = {
        active: "bg-slate-400 hover:bg-slate-300",
        inactive: "bg-slate-50 hover:bg-slate-300",
    };
</script>

<div class="flex items-center">
    <input type="checkbox" id={label} bind:checked={isEnabled}/>
    <label for={label}>{label}</label>
</div>