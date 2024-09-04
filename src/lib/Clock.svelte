<script>
	import moment from "moment-timezone";
	import * as clk from "./clock";

	export let zone = 'Asia/Kolkata';
	export let zoneName = 'India';
	export let ztime = moment().tz(zone);
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
	$: faceColor = thr < 6 ? '#666' : thr < 12 ? 'skyblue' : thr < 18 ? 'seagreen' : '#099'; 
	$: handColor = thr < 6 ? '#ddd' : thr < 12 ? 'blue' : thr < 18 ? 'beige' : '#fff'; 
</script>

<style>
	.hand {transition: all 0.5s;}
</style>
<div class="p-2 w-fit m-2 shadow-md shadow-blue-500 rounded-md border-t-2">
	<svg viewBox="-60 -60 120 120" width={wid}>
		<circle r={49} fill={faceColor} />
		<circle r={2} fill="#699" />
		{#each hpoints as hp}
		<text x={hp.x} y={hp.y} text-anchor="middle" font-size={3}>{hp.val + (thr > 11 ? 12: 0)}</text>
		{/each}
		<polygon class="hand" points="-4,0 2,-2 30,0 2,2 -4,0" fill={faceColor} stroke={handColor} stroke-width="0.4" transform={`rotate(${ang.h})`} />
		<polygon class="hand" points="-4,0 2,-1.5 42,0 2,1.5 -4,0" fill={faceColor} stroke={handColor} stroke-width="0.4" transform={`rotate(${ang.m})`} />
		<g fill={faceColor}>
			<text x={-20} y={-53} text-anchor="middle" font-size={8}>{zoneName}</text>
			<text x={30} y={-52} text-anchor="middle"  font-weight={600} font-size={10}>{ztime.format('HH:mm:ss')}</text>
		</g>
	</svg>
</div>
