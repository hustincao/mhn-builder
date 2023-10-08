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
<div
  tabindex="0"
  role="button"
  class="relative bg-slate-50 p-2 rounded-md hover:bg-slate-400"
  bind:this={wrapperElement}
  on:focusout={(e)=>{
    if(e.relatedTarget === null) isShow = false;
    // console.log(e);
  }}
  on:click|stopPropagation={() => {
    isShow = !isShow;
  }}
  on:keypress={() => {
    isShow = !isShow;
  }}
>
  <slot name="label" />
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
