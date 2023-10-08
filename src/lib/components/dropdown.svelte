<script>
  // export let addToObserverList;
  let screenWidth = 0,
    overflow = 0;
  let wrapperElement, tooltipWidth;

  let isShow = false;

  const updateFunction = () => {
    if (screenWidth) {
      const left = wrapperElement?.getBoundingClientRect().left || 0;
      overflow = Math.min(0, screenWidth - (left + tooltipWidth));
    }
  };

  $: {
    screenWidth;
    wrapperElement;
    tooltipWidth;
    updateFunction();
  }
</script>

<svelte:window bind:outerWidth={screenWidth} />
<div class="relative" bind:this={wrapperElement}
  >
  <button
    class="bg-slate-50 p-2 rounded-md hover:bg-slate-400"
    on:click={() => {
      isShow = !isShow;
    }}
    on:focusout={({ relatedTarget }) => {
      if (
        relatedTarget instanceof HTMLElement &&
        wrapperElement.contains(relatedTarget)
      )
        return;
      isShow = false;
    }}
  >
    <slot name="label" />
  </button>
  <div
    bind:offsetWidth={tooltipWidth}
    style={`left:${overflow}px`}
    class={`${
      isShow ? " visible opacity-100" : "invisible opacity-0"
    } w-max max-w-xs top-5 absolute z-50 p-2 transition-opacity bg-slate-900 rounded-lg font-semibold text-slate-50`}
  >
    <slot name="description" />
  </div>
</div>
