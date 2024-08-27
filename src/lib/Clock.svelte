<script>
	import moment from "moment-timezone";
	import * as clk from "./clock";

	export let ztime = moment();
	export let wid = 200;

	let hpoints = clk.getPoints(35, 12);
	let mpoints = clk.getPoints(45, 60);

	$: thr = ztime.hour();
	$: tmi = ztime.minute();
	$: tse = ztime.second();
	$: ang = {
		h: (thr*30 + tmi/2) - 90,
		m: (tmi*6 + tse / 10) - 90
	}
	$: hclr = thr < 6 ? '#666' : thr < 12 ? 'skyblue' : thr < 18 ? 'seagreen' : 'navy'; 
</script>

<style>
	.hand {transition: all 0.5s;}
</style>
<div class="p-2 w-fit m-2 shadow-md shadow-blue-500 rounded-md border-t-2">
	<svg viewBox="-60 -60 120 120" width={wid}>
		<circle r={49} fill="#eee" />
		<circle r={2} fill="#699" />
		{#each hpoints as hp}
		<text x={hp.x} y={hp.y} text-anchor="middle" font-size={3}>{hp.val + (thr > 11 ? 12: 0)}</text>
		{/each}
		<polygon class="hand" points="-4,0 2,-1 30,0 2,1 -4,0" fill={hclr} stroke="navy" stroke-width="0.4" transform={`rotate(${ang.h})`} />
		<polygon class="hand" points="-4,0 2,-1 42,0 2,1 -4,0" fill={hclr} stroke="navy" stroke-width="0.4" transform={`rotate(${ang.m})`} />
	</svg>
</div>
