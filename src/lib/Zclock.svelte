<script>
	import moment from "moment-timezone";
  import * as clk from "./clock";
	import { onMount } from "svelte";

  export let showLocal = true;
  export let wid = 200;
  export let zone;
  export let showHoursFormat = true;

  let localTime = moment();
  let hrs = 12;
  let fillColor = 'aliceblue';
  $: hr24 = hrs == 24;
  let curdt = moment().tz(zone);
  $: hr = curdt.hour();
  $: points = clk.getPoints(30, hrs);
  $: minPoints = clk.getPoints(45, 60);
  $: hrAng = (curdt.hour()*(360/hrs) + curdt.minute()/2)-90;
  $: miAng = (curdt.minute()*6 + curdt.second()/10)-90;
  $: fillColor = hr < 6 ? '#666' : hr < 12 ? 'skyblue' : hr < 18 ? 'seagreen' : 'navy';
  $: hrAngLocal = (localTime.hour()*(360/hrs) + localTime.minute()/2)-90;
  $: miAngLocal = (localTime.minute()*6 + localTime.second()/10)-90;
  
  onMount(() => {
    setInterval(() => {
      curdt = moment().tz(zone)
      localTime = moment();
    })
  })
</script>

<style>
	.hand {
		transition: all 0.5s;
	}
</style>

<div class="">
  <div class="bg-gray-200 flex md:flex-row flex-col text-center p-1">
    <div>{#if zone}{curdt.format("ddd DD MMM HH:mm:ss z")}{/if}</div>
    <div class="{showHoursFormat ? 'visible': 'hidden'} ml-4">
      Format: <label><input type="radio" bind:group={hrs} value={12}> 12 hrs</label>
      <label><input type="radio" bind:group={hrs} value={24}> 24 hrs</label>
    </div>
  </div>
  <div>
    <svg viewBox="-50 -50 100 100" width={wid} >
      <defs>
				<radialGradient id="face">
					<stop offset="10%" stop-color="lightcyan" />
					<stop offset="45%" stop-color="beige" />
					<stop offset="95%" stop-color="navy" />
				</radialGradient>
				<radialGradient id="hrface">
					<stop offset="10%" stop-color="indigo" />
					<stop offset="55%" stop-color="#8ae" />
					<stop offset="65%" stop-color="silver" />
				</radialGradient>
			</defs>
      <circle r={49} fill="url(#face)" stroke="navy" stroke-width={zone? 0.8 : 0.3} />
      <circle r={34} fill="url(#hrface)" stroke="darkblue" stroke-width={zone? 0.5 : 0.3} />
      <!-- <text x={0} y={0} text-anchor="middle">{curdt.format("HH:mm:ss")}</text> -->
      {#each points as m}
      <text x={m.x} y={m.y} font-size={m.val%3?2:4} font-weight={m.val%3?600:200} fill={m.val%3?'darkslate':'blue'} text-anchor="middle">{m.val + (hr24 ? 0 : curdt.hour() > 12 ? 12 : 0)}</text>
      {/each}
      {#each minPoints as mp}
      <text x={mp.x} y={mp.y} font-size={mp.val%5?3:4} fill={mp.val%5?'gray':'aliceblue'} text-anchor="middle">{mp.val}</text>
      {/each}
      <polyline class="hand" points="-4,0 2,-1 27,0 2,1 -4,0" fill={fillColor} stroke="navy" stroke-width={0.3} transform={`rotate(${hrAng})`} />
      <polyline class="hand" points="-4,0 2,-1 40,0 2,1 -4,0" fill={fillColor} stroke="navy" stroke-width={0.3} transform={`rotate(${miAng})`} />

      {#if showLocal}
      <!-- local time -->
       <line x1={-6} x2={28} stroke="brown" stroke-linecap="round" transform={`rotate(${hrAngLocal})`} />
       <line x1={-6} x2={40} stroke="brown" stroke-linecap="round" transform={`rotate(${miAngLocal})`} />
      {/if}
    </svg>
  </div>
</div>