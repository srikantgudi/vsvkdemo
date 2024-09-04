<svelte:head>
	<title>Calendar</title>
</svelte:head>
<script>
	import Calendar from "$lib/Calendar.svelte";
	import moment from "moment-timezone";
	import { onMount } from "svelte";
	let yr = moment().year();
  let mo = moment().month();
</script>

<Calendar />
