<script>
  import moment from 'moment-timezone';
  import Clock from '$lib/Clock.svelte';

  let zone1 = "Asia/Kolkata";
  let zone2 = "Asia/Tokyo";
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
</script>

<div class="grid md:grid-cols-2 md:gap-4 grid-cols-1 gap-1">
  <div><Clock {zones} /></div>
  <div><Clock {zones} /></div>
</div>