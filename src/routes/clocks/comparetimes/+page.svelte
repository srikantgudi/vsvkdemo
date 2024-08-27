<script>
	import Zones from "$lib/zones.svelte";
	import moment from "moment-timezone";
	import Clock from "../../../lib/Clock.svelte";
  let zone1;
  let customTime = moment();
  let newTime = moment();
  $: zone1Time = zone1 ? moment.tz(zone1) : moment();
  
  const setCustomTime = e => {
    customTime = moment(e.target.value);
  }
  const setCustomZoneTime = () => {
    zone1Time = moment(customTime.format()).clone().tz(zone1);
  }

  const setRealTime = () => {
    zone1Time = moment.tz(zone1);
  }
</script>
<div class="p-1">
  <div class="text-2xl">Compare times</div>
  <div class="grid md:grid-cols-2 grid-cols-1 gap-2">
    <div class="col-span-1">
      <div>{zone1} &raquo; <span class="text-blue-400 text-2xl font-bold">{zone1Time.format("ddd D MMM HH:mm:ss")}</span></div>
      <div><span class="text-amber-700 text-xl">Set Custom time</span>: <input class="p-1 rounded-md border border-gray-600" type="datetime-local" on:change={setCustomTime} /></div>
      <div class="my-2">Select a zone &downarrow;</div>
      <Zones cols={2} bind:zone={zone1}/>
    </div>
    <div>
      <div class="flex gap-2">
        <button on:click={setCustomZoneTime} class="rounded-md bg-blue-500 text-cyan-200 p-1">Custom zone time</button>
        <button on:click={setRealTime} class="rounded-md bg-amber-700 text-cyan-200 p-1">Real time</button>
      </div>
      <div>
        Custom time <span class="text-blue-700 text-2xl">{customTime.format("ddd DD MMM HH:mm")}</span> = <span class="text-amber-800 text-2xl">{zone1Time.format("ddd DD MMM HH:mm")}</span> in {zone1}
      </div>
      <Clock ztime={zone1Time} wid={400} />
    </div>
  </div>
</div>