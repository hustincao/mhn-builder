<script>
    export let label = "";
    export let description = "";
    console.log(description);
</script>

<div class="relative">
    <div class="peer flex items-center gap-x-2 bg-slate-100 rounded-lg px-2">
    {@html label}
  
</div>
    <div
        class="invisible w-60 top-5 absolute z-10 p-2 peer-hover:visible peer-hover:opacity-100 opacity-0 transition-opacity bg-slate-900 rounded-lg font-semibold text-slate-50"
    >
        {@html description}
    </div>
</div>
