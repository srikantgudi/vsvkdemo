<svelte:head>
	<title>Clocks</title>
</svelte:head>

<script>
	import Clock from "$lib/Clock.svelte";
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
<div class="md:w-full">
	<div class="text-2xl">Zonal Clocks</div>
	<div>
		<div class="flex md:flex-row flex-col gap-2">
			<Clock />
		</div>
	</div>
</div>