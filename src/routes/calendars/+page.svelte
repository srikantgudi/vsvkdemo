<svelte:head>
	<title>Calendar</title>
</svelte:head>
<script>
	import Calendar from "$lib/Calendar.svelte";
	import moment from "moment-timezone";
	import { onMount } from "svelte";
	let yr = moment().year();
  let mo = moment().month();

  // const weekDayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  // let dt = new Date(yr,mo,1);
  // console.log('dt:',dt.toString());
  // let start;
  // let endDate;
  // let days = [];

  // onMount(() => {
	// 	calcDays();
	// });

	// const calcDays = () => {
	// 	dt = new Date(yr,mo,1);
  //   start = moment(dt.toString()).startOf('month');
  //   endDate = endDate = moment(dt.toString()).endOf('month').date();
  //   days = [];
  //   console.log('calendar component...');
  //   console.log('dt:',dt);
  //   let weekday = start.weekday();
  //   for (let w=0; w < weekday; w++) {
  //     days = [...days,' ']
  //   }
  //   for (let d=start.date(); d <= endDate; d++) {
  //     days = [...days, d];
  //   }
  //   console.log('yr',yr,'mo',mo);
  //   console.log('start:', start, 'end:',endDate,'days:',days);
  // }

</script>
<div class="text-2xl font-bold">Calendars</div>
<Calendar />
