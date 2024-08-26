<script>
	import {onMount} from "svelte";
	import moment from 'moment-timezone';
	
	let zones = [
    {name:"India", value:"Asia/Kolkata"},
		{name:"US-West", value:"America/Los_Angeles"},
    {name:"US-East", value:"America/New_York"},
		{name:"Afghanistan", value:"Asia/Kabul"},
    {name:"Japan", value:"Asia/Tokyo"},
		{name:"UK", value:"Europe/London"},
    {name:"France", value:"Europe/Paris"},
    {name:"Berlin", value:"Europe/Berlin"},
    {name:"Moscow", value:"Europe/Moscow"},
		{name:"Perth", value:"Australia/Perth"},
    {name:"Sydney", value:"Australia/Sydney"},
    {name:"New Zealand", value:"Pacific/Auckland"},
  ];
	let zone = zones[0];
	let handClr = '#009'

	let dt = moment.tz(zone.value);
	let localdt = moment();
	let angms = 0;
	let mimarks = [];
	let hrmarks = [];
	let textPoints = [];

	let clockHrs = 12;
	$: hr = dt.hours();
	$: mi = dt.minutes();
	$: se = dt.seconds();
	$: ms = dt.milliseconds();
	$: ap = hr < 12 ? 'am' : 'pm';
	$: lochr = localdt.hours();
	$: locmi = localdt.minutes();
	$: locse = localdt.seconds();
	$: locap = lochr < 12 ? 'am' : 'pm';

	let hr24 = false;
	$: ang = {h: hr24 ? 15 : 30, m: hr24 ? 3 : 6};
	
	$: angh = (hr * ang.h + mi / 2) - 90;
	$: angm = (mi * 6 + se / 10) - 90;
	$: angs = (se * 6) - 90;
	$: handClr = (lochr < 6 ? '#333' : lochr < 12 ? 'blue' : lochr < 18 ? 'seagreen' : '#666');
	$: locangh = (lochr * ang.h + locmi / 2) - 90;
	$: locangm = (locmi * 6 + locse / 10) - 90;
	$: locangs = (locse * 6) - 90;
	
	const setHr24 = (/*bool*/) => {
	// hr24 = bool;
		clockHrs = hr24 ? 24 : 12;
		let hrang = 360 / clockHrs;
		hrmarks = [];
		for (let h=0; h < clockHrs; h++) {
			const rad = ((h * hrang - 90) * Math.PI) / 180;
			hrmarks = [
				...hrmarks,
				{
					val: h,
					x: Math.cos(rad) * 24,
					y: Math.sin(rad) * 24
				}
			]
		}
		console.log('hrmarks:', hrmarks);
	}

	onMount(() => {
		dt = moment.tz(zone.value);
		localdt = moment();
		setHr24(false);
		// set text points
		const numpoints = zones.length;
		const ang = 360 / numpoints;
		let arr = [];
		let rad = 0;
		for (let i = 0; i < numpoints; i++) {
			rad = ((i * ang - 90) * Math.PI) / 180;
			textPoints = [
				...textPoints,
				{
					z: zones[i],
					x: Math.cos(rad) * 45,
					y: Math.sin(rad) * 42,
				},
			];
		}
		// minute martks
		setMiMarks();
		// console.log('mi-marks:', mimarks);
		setInterval(() => {
			dt = moment().clone().tz(zone.value);
			// dt = new Date();
		},1)
	})
	const setMiMarks = () => {
		for (let i=0; i < 60; i++) {
			let rad = ((i * 6 - 90) * Math.PI) / 180;
			mimarks = [
				...mimarks,
				{
					val: i,
					wt: i%5 ? 400 : 700,
					size: i%5 ? 2 : 3,
					clr: i%5 ? 'lightblue' :'beige',
					x: Math.cos(rad) * 34,
					y: Math.sin(rad) * 34,
				}
			]
		}
	}
	const setZone = (v) => {
		zone = v;
		console.log('set zone:', zone);
	}
</script>
<style>
	line {
		transition: all 0.5s;
	}
	.hand {
		transition: all 0.5s;
	}
</style>
<div class="md:w-2/5 w-full bg-gray-100 bg-gradient-to-t from-gray-800 via-cyan-300 to-slate-700 shadow-lg shadow-gray-600 p-2 rounded-2xl">
	<div class="my-2 px-2">
		<div>
			<span class="text-2xl text-gray-200">{zone.name} <span class="text-sm text-gray-300">({zone.value})</span>
			<span class="ml-4 float-right">
				<label>
					<input type="radio" bind:group={hr24} on:change={setHr24} value={false} />12hr
				</label>
				<label>
					<input type="radio" bind:group={hr24} on:change={setHr24} value={true} /> 24hr
				</label>
			</span>
		</div>
		<div class="text-gray-200 font-[monospace] text-lg">{dt.format('DD-MMM-YYYY HH:mm:ss a')}</div>
		<div class="text-gray-300 font-[monospace]">Local time: {localdt.format('DD-MMM-YYYY HH:mm:ss a')}</div>
	</div>
	<div>
		<svg viewBox="-50 -50 100 100">
			<defs>
				<radialGradient id="face">
					<stop offset="10%" stop-color="lightcyan" />
					<stop offset="25%" stop-color="beige" />
					<stop offset="95%" stop-color="navy" />
				</radialGradient>
			</defs>
			<circle r={49} fill="url(#face)" stroke="navy" stroke-width="0.5"/>
			<circle r={4} fill="lightblue" />
			{#each mimarks as m}
			<text x={m.x} y={m.y} fill={m.clr} text-anchor="middle" font-size={m.size}>{m.val}</text>
			{/each}
			{#each hrmarks as m}
			<text x={m.x} y={m.y} fill={m.clr} text-anchor="middle" font-size={3}>{m.val==0 ? hr24 ? 0 :12 : m.val}</text>
			{/each}
			{#each textPoints as t}
			<text class="cursor-pointer" text-anchor="middle"
				on:click={() => setZone(t.z)} 
				x={t.x} y={t.y}
				font-weight={t.z.value===zone.value ? 600 : 400}
				fill={t.z.value===zone.value?'cyan':'lightblue'}
				font-size={t.z.value===zone.value ? 3 : 2}>
				{t.z.name}
			</text>
		{/each}
			<line x1={-4} x2={20} stroke="brown" transform={`rotate(${locangh})`} />
			<line x1={-4} x2={26} stroke="brown" transform={`rotate(${locangm})`} />
			<polyline class="hand" points="-4,0 4,-1 20,0 4,1 -4,0" fill={handClr} stroke="bold" stroke-width={0.5} transform={`rotate(${angh})`} />
			<polyline class="hand" points="-4,0 4,-1 26,0 4,1 -4,0" fill={handClr} stroke="bold" stroke-width={0.5} transform={`rotate(${angm})`} />
			<line x1={-4} x2={30} stroke="olive" stroke-width="0.5" transform={`rotate(${angs})`} />
		</svg>
	</div>
</div>
