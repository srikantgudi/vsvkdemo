<script>
  import {onMount} from 'svelte';
  import * as cal from '$lib/cal';
  import moment from "moment-timezone";

  let curyr = moment().year();

  let startYr = moment().year() - (moment().year()%10);

  let years = [];

  $: {
    years = [];
    for (let y=0; y < 10; y++) {
      years = [...years, startYr+y+1];
    }
  }

  let wclr = ['#0e9','#0ef','lightcyan','golden','pink','olive','#0e9'];

  const getNumDays = (m) => {
    const startdt = moment([curyr,m]).startOf('month');
    const enddt = moment([curyr,m]).endOf('month');
    return {weekday: startdt.weekday(), numdays: enddt.date()}
  }

  const calcDays = (m) => {
    let days = [];
    console.log(m,curyr);
    const dates = getNumDays(m,curyr);
    let w = dates.weekday;
    let dt = moment([curyr,m,1]);
    for (let d=1; d <= dates.numdays; d++) {
      days = [...days, {w,d}];
      w++;
      if (w > 6) {
        w = 0;
      }
    }
    return days;
  }
</script>
<div>
  <div class="flex items-center text-xl">Yearly Calendar :: Select year: <div class="ml-4 flex gap-1">
    <button on:click={() => startYr -= 20} class="p-1 px-2 w-fit rounded-md bg-gray-300">&laquo; -20</button>
    <button on:click={() => startYr -= 10} class="p-1 px-2 w-fit rounded-md bg-gray-300">&lsaquo; -10</button>
    {#each years as y}
    <button on:click={() => curyr=y} class="rounded-md p-1 bg-gray-300">{y}</button>
    {/each}
    <button on:click={() => startYr += 10} class="p-1 px-2 w-fit rounded-md bg-gray-300">&rsaquo; +10</button>
    <button on:click={() => startYr += 20} class="p-1 px-2 w-fit rounded-md bg-gray-300">&raquo; +20</button>
  </div>
  </div>
  <div class="my-2 gap-1">
    <div class="col-span-2">
      {#each cal.monthNames as md, mdi}
      <div class="flex gap-1 mb-1 p-1 w-fit shadow-md">
        <button class="p-2 w-24 bg-gray-200 hover:bg-gray-500 hover:text-gray-200 rounded-t-xl">{md.slice(0,3)}</button>
        <div class="flex flex-wrap items-center gap-1 text-xs">
          {#each calcDays(mdi,curyr) as d}
          <div class="p-1 bg-blue-100 shadow-lg text-center">
            <div style="background-color:{wclr[d.w]}" class="p-1">{cal.weekDayNames[d.w]}</div>
            <div>{d.d}</div>
          </div>
          {/each}
        </div>
      </div>
      {/each}
    </div>
  </div>
</div>
