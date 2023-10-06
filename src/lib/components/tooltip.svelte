<script>
    let outerWidth, offsetWidth, contentRect, contentBoxSize;
    $: console.log("Content Box", contentBoxSize);
    $: console.log("Content Rect", contentRect);
    $: console.log("Outer Width", outerWidth);
    $: console.log("Offset Width", offsetWidth); 

    // need -77px
</script>

<svelte:window bind:outerWidth />
<div class="relative">
    <div class="peer flex items-center gap-x-2 bg-slate-100 rounded-lg px-2">
        <slot name="label" />
    </div>
    <div
    bind:contentBoxSize
        bind:contentRect
        bind:offsetWidth
        role="tooltip"
        style={`left: -${outerWidth-offsetWidth}px`}
        class="invisible w-max max-w-xs top-5 absolute z-50 p-2 peer-hover:visible peer-hover:opacity-100 opacity-0 transition-opacity bg-slate-900 rounded-lg font-semibold text-slate-50"
    >
        <slot name="description" />
    </div>
</div>
