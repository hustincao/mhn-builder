<script>

  let outerWidth, tooltipElement, contentRect;

  $: tooltipRect = tooltipElement && tooltipElement.getBoundingClientRect();
  $: overflow = Math.max(0, tooltipRect?.right - outerWidth);

</script>

<svelte:window bind:outerWidth />
<div class="relative">
  <div class="peer flex items-center gap-x-2 bg-slate-100 rounded-lg px-2">
    <slot name="label" />
  </div>
  <div
    bind:this={tooltipElement}
    bind:contentRect
    style={`left: -${overflow}px`}
    role="tooltip"
    class="invisible w-max max-w-xs top-5 absolute z-50 p-2 peer-hover:visible peer-hover:opacity-100 opacity-0 transition-opacity bg-slate-900 rounded-lg font-semibold text-slate-50"
  >
    <slot name="description" />
  </div>
</div>
