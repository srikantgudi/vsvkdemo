<script>
  import {onMount} from 'svelte';
  import moment from "moment-timezone";
  let curdt = moment();
  let yr = moment().year();
  let mo = moment().month();
  let radialYr = moment().year();
  let radialMo = moment().month();
  let dayAng = 0;

  let startYr = (yr - (yr%10));
  let maxRadialYears = 20;
  
  let monthPoints = [];
  let weekPoints = [];
  let yearPoints = []

  const weekDayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const monthNames = ['January','February','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
  const getRad = (n, ang) => ((n * ang - 90) * Math.PI) / 180
  const getAng = (n) => 360 / n;
  const getNumDays = (m,y) => {
    const startdt = moment([y,m]).startOf('month');
    const enddt = moment([y,m]).endOf('month');
    return {weekday: startdt.weekday(), numdays: enddt.date()}
  }
  const calcDays = () => {
    let days = [];
    const dates = getNumDays(curdt.month(),curdt.year())
    for (let w=0; w < dates.weekday; w++) {
      days = [...days, '*']
    }
    for (let d=1; d <= dates.numdays; d++) {
      days = [...days, d]
    }
    return days;
  }
  const getWeekAng = (d) => d * getAng(7) - 90;
  const getDayAng = (dt) => {
    const ndays = getNumDays(dt.month(), dt.year()).numdays;
    return (dt.date()) * getAng(ndays) - 90;
  }
  const dayPoints = () => {
    const dates = getNumDays(curdt.month(), curdt.year());
    let points = [];
    const ang = 360 / dates.numdays;
    for (let d=1; d <= dates.numdays; d++) {
      let rad = ((d * ang - 90) * Math.PI) / 180;
      points = [...points, {val:d, x: Math.cos(rad) * 32, y: Math.sin(rad) * 32}]
    }
    return points;
  }
  
  onMount(() => {
    let ang = getAng(12);
    monthPoints = []
    for (let i=0; i < 12; i++) {
      const rad = getRad(i,ang);
      monthPoints = [...monthPoints, {
        id: i,
        val: monthNames[i].slice(0,3),
        x: Math.cos(rad) * 44,
        y: Math.sin(rad) * 45
      }]
    }
    calcYears();
    weekPoints = [];
    const weekAng = getAng(7);
    for (let i=0; i < 7; i++) {
      const rad = getRad(i,weekAng);
      weekPoints = [...weekPoints, {
        id: i,
        val: weekDayNames[i],
        x: Math.cos(rad) * 18,
        y: Math.sin(rad) * 18
      }]
    }
  })
  
  const setYear = (y) => {
    yr = y;
    curdt = curdt.year(y);
    calcDays();
  }

  const setMonth = (m) => {
    mo = m;
    curdt = curdt.month(m);
    calcDays();
  }
  const setDate = (d) => {
    curdt = curdt.date(d);
    calcDays()
  }

  const calcYears = () => {
    yearPoints = []
    const angYr = 360 / maxRadialYears;
    for (let y=0; y < maxRadialYears; y++) {
      const rad = getRad(y, angYr);
      yearPoints = [...yearPoints, {val:startYr+y, x: Math.cos(rad)*57, y: Math.sin(rad)*56}];
    }
  }
  const setStartYear = (delta) => {
    startYr += delta;
    calcYears();
  }
</script>

<div>
<<<<<<< Updated upstream
  <div class="text-blue-500 md:text-3xl text-2xl mb-2">
    {curdt.format("MMMM YYYY")}
  </div>
=======
>>>>>>> Stashed changes
  <div>
    <div class="mb-2 grid grid-cols-12 text-center gap-1">
      {#each monthNames as md, mdi}
      <button on:click={() => setMonth(mdi)} 
        class="p-2 rounded-t-md text-gray-{curdt.month()=== mdi ? 600 : 300}">{md.slice(0,3)}</button>
      {/each}
    </div>
    <div class="grid grid-cols-7 text-center gap-1 bg-gray-100">
      {#each weekDayNames as wd}
      <div class="bg-blue-800 text-gray-200 p-2">{wd}</div>
      {/each}
    </div>
    <div class="grid grid-cols-7 text-center gap-1 bg-gray-400 p-2">
      {#each calcDays(mo,yr) as d}
      <button on:click={() => setDate(d)} class={`cursor-pointer text-${d==curdt.date() ? '3xl' : 'lg'} text-blue-${d==curdt.date() ? 500 : 400} bg-blue-${d==curdt.date() ? '500' : '400'} rounded-t-xl p-8 bg-gray-200 shadow-md shadow-b shadow-blue-600`}>{d}</button>
      {/each}
    </div>
  </div>
</div>