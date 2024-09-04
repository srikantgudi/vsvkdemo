<script>
  export let zone = 'Asia/Kolkata';
  export let cols = 3;
  import zones from '$lib/zones';

  // let zones = [
	// 	{name:"India", value:"Asia/Kolkata"},
	// 	{name:"Singapore", value:"Asia/Singapore"},
  //   {name:"Japan", value:"Asia/Tokyo"},
	// 	{name:"US-West", value:"America/Los_Angeles"},
  //   {name:"US-East", value:"America/New_York"},
	// 	{name:"UK", value:"Europe/London"},
  //   {name:"France", value:"Europe/Paris"},
  //   {name:"Berlin", value:"Europe/Berlin"},
  //   {name:"Moscow", value:"Europe/Moscow"},
	// 	{name:"Perth", value:"Australia/Perth"},
  //   {name:"Sydney", value:"Australia/Sydney"},
  //   {name:"New Zealand", value:"Pacific/Auckland"},
  // ];
  zone = zones[0].value;
</script>
<select bind:value={zone}>
  {#each zones as z}
    <option value={z.value}> {z.name}</option>
  {/each}
</select>