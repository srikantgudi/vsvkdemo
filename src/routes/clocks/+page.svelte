<script>
  // import Zones from '$lib/Zones.svelte';
	// import Zclock from '../../lib/zclock.svelte';
  import {onMount} from 'svelte';
	import Clock from '../../lib/Clock.svelte';
	import moment from 'moment-timezone';
  import {zones} from '../../lib/zonelist';

  let zone1 = 'Asia/Kolkata';
  let zone2 = 'Asia/Kolkata';

  $: zone1time = moment().tz(zone1);
  $: zone2time = moment().tz(zone2);
  
  let ztimes = [];

  const setCustomTime = e => {

  }

  onMount(() => {
    setInterval(() => {
      getZoneTimes();
    })
  })
  
  const getZoneTimes = () => {
    ztimes = zones.map((z) => {
      return {name: z.name, value: z.value, time: moment().tz(z.value)}
    });
  }
  
</script>

<div>
  <div class="col-span-10">
    <div class ="my-2 flex items-center gap-2">
      <div class="text-3xl">Clocks :: {zone1}</div>
      <!-- <div> | </div>
      <div class="ml-4">Custom time: <input class="p-1 rounded-md border border-gray-600" type="datetime-local" on:change={setCustomTime} /></div> -->
    </div>
    <div>
      <div class="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 w-auto">
        {#each ztimes as z}
        <Clock zone={z.value} ztime={z.time} zoneName={z.name} />
        {/each}
      </div>
    </div>
  </div>
</div>