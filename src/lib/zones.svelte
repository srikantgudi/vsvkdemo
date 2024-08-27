<script>
  export let zone;

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
  zone = zones[0].value;
</script>
<div class="grid md:grid-cols-3 grid-cols-2 gap-1 p-1 hover:bg-stone-300 rounded-md shadow-md shadow-blue-600">
  {#each zones as z}
  <label class="rounded-full bg-gray-100 p-1 px-1"><input type="radio" bind:group={zone} value={z.value}> {z.name}</label>
  {/each}
</div>