<script>
  let screenWidth = 0,
    overflow = 0;
  let wrapperElement, tooltipWidth;

  const updateFunction = () => {
    if (screenWidth) {
      const left = wrapperElement?.getBoundingClientRect().left || 0;
      overflow = Math.min(0, screenWidth - (left + tooltipWidth));
    }
  };

  $: {
    screenWidth; wrapperElement; tooltipWidth;
    updateFunction();
  }
</script>

<svelte:window bind:outerWidth={screenWidth} />
<div class="relative" bind:this={wrapperElement}>
  <div class="peer">
    <slot name="label" />
  </div>
  <div
    bind:offsetWidth={tooltipWidth}
    style={`left:${overflow}px`}
    role="tooltip"
    class="invisible w-max max-w-xs top-5 absolute z-50 p-2 peer-hover:visible peer-hover:opacity-100 opacity-0 transition-opacity bg-slate-900 rounded-lg font-semibold text-slate-50"
  >
    <slot name="description" />
  </div>
</div>
