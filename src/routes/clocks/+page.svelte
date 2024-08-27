<svelte:head>
	<title>Clocks</title>
</svelte:head>

<script>
	import Clock from "$lib/Clock.svelte";
	import Zclock from "$lib/Zclock.svelte";
	let zones = [
		{name:"India", value:"Asia/Kolkata"},
		{name:"Singapore", value:"Asia/Singapore"},
    {name:"Japan", value:"Asia/Tokyo"},
		{name:"US-West", value:"America/Los_Angeles"},
    {name:"US-East", value:"America/New_York"},
		{name:"UK", value:"Europe/London"},
    {name:"France", value:"Europe/Paris"},
    {name:"Berlin", value:"Europe/Berlin"},
    {name:"Moscow", value:"Europe/Moscow"},
		{name:"Perth", value:"Australia/Perth"},
    {name:"Sydney", value:"Australia/Sydney"},
    {name:"New Zealand", value:"Pacific/Auckland"},
  ];
	let zone = zones[0].value;
</script>

<style>
	button {
		font-size: inherit;
		text-align: left;
		padding: 0.5rem;
		cursor: pointer;
	}
	.zones-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, 15rem);
		gap: 1rem;
		justify-content: left;
		align-items: center;
	}
</style>
<div class="md:w-2/3 w-full">
	<div class="text-2xl text-blue-600 my-2">Zonal Clocks - <small>zonal times and local time</small></div>
	<div>
		<div class="grid md:grid-cols-12 gap-2">
			<div class="col-span-2 flex md:flex-col flex-wrap md:gap-2 gap-2 my-2">
				{#each zones as z}
				<label class="text-center p-1 w-[8rem] shadow-md shadow-gray-500 rounded-full bg-gray-{zone!==z.value?'300':'400'}">
					<input type="radio" bind:group={zone} value={z.value}> {z.name}</label>
				{/each}
			</div>
			<div class="col-span-10">
				<Zclock wid={600} {zone} />
			</div>
		</div>
	</div>
</div>