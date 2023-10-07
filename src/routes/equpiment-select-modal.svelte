<script>
  import {onDestroy, getContext} from 'svelte';
  export let isModalOpen;

  let armors;

  const unsubscribe = getContext('armors').subscribe(value => {
    armors = value;
  })

  onDestroy(unsubscribe);

</script>

<button class="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-slate-900 bg-opacity-50" on:click={()=>{isModalOpen=false}}>
  <div class="bg-slate-300">
    Hello
  </div>
</button>