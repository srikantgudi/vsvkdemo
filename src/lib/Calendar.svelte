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
    return (dt.date()-1) * getAng(ndays) - 90;
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

<div class="grid md:grid-cols-2 gap-4">
  <div class="md:w-3/4 md:px-2">
    <div class="text-2xl font-serif">Radial Calendar</div>
    <div class="rounded-lg shadow-md shadow-blue-400 border-t-2 w-full">
      <svg viewBox="-65 -65 130 130">
        <circle r={62} fill="darkslategrey" stroke="#009" />
        <circle r={52} fill="darkslate" stroke="olive" />
        <circle r={40} fill="#333" stroke="teal"  />
        <circle r={24} fill="cornflowerblue" stroke="navy" stroke-width={0.3} />
        <g  class="cursor-pointer" on:click={() => setStartYear(-maxRadialYears)}>
          <rect x={-45} y={-60} rx={2} ry={2} width={12} height={6} fill="black" stroke-width="0.4" stroke="blue" />
          <text x={-43} y={-56} fill="white" font-size={3}>&lt;-{maxRadialYears}</text>
        </g>
        
        <g class="cursor-pointer" on:click={() => setStartYear(maxRadialYears)}>
          <rect x={34} y={-60} rx={2} ry={2} width={12} height={6} fill="#000" stroke-width="0.4" stroke="blue" />
          <text x={36} y={-56} fill="white" font-size={3}>&gt;+{maxRadialYears}</text>
        </g>
        {#each yearPoints as yp}
        <g on:click={() => setYear(yp.val)}>
          <rect x={yp.x-5} y={yp.y-4} rx={2} width={10} height={6} fill="#333" stroke-width="0.4" stroke="gray" />
          <text  class="cursor-pointer" x={yp.x} y={yp.y} text-anchor="middle" fill={curdt.year()==yp.val ? 'white':'beige'} font-weight={curdt.year()==yp.val ? 600 : 400} font-size={2.5}>{yp.val}</text>
        </g>
        {/each}
        {#each monthPoints as p}
        <text class="cursor-pointer" on:click={() => setMonth(p.id)} x={p.x} y={p.y} text-anchor="middle" font-weight={curdt.month()==p.id?600:100} fill="beige" font-size={4}>{p.val}</text>
        {/each}
        {#each weekPoints as p}
        <text x={p.x} y={p.y} text-anchor="middle" font-weight={curdt.weekday()==p.id?600:200} fill={curdt.weekday()==p.id ? 'blue' : 'navy'} font-size={4}>{p.val}</text>
        {/each}
        {#each dayPoints() as d}
        <text class="cursor-pointer" on:click={() => setDate(d.val)} x={d.x} y={d.y} text-anchor="middle" fill={d.val===curdt.date()?'#eee':'#aaa'} font-weight={d.val===curdt.date() ? 600 :200} font-size={d.val===curdt.date() ?5:4}>{d.val}</text>
        {/each}
        <!-- <polyline points="48,0 46,-1 44,-1 44,0 44,1 46,1 48,0" fill="maroon" transform={`rotate(${curdt.month()*30-90})`} /> -->
        <polyline points="51,-1 47,0 51,1" fill="lightcyan" transform={`rotate(${curdt.month()*30-90})`} />
        <polyline points="16,0 12,-1 12,1 16,0" fill="maroon" transform={`rotate(${getWeekAng(curdt.weekday())})`} />
        <polyline points="29,0 25,-1 25,1 29,0" fill="lightblue" transform={`rotate(${getDayAng(curdt)})`} />
      </svg>
    </div>
  </div>
  <div>
    <div class="text-blue-500 md:text-3xl text-2xl mb-2">
      {curdt.format("MMMM YYYY")}
    </div>
    <div class="shadow-lg shadow-blue-500 rounded-lg">
      <div class="mb-1 grid grid-cols-12 text-center gap-1">
        {#each monthNames as md, mdi}
        <button on:click={() => setMonth(mdi)} class="shadow-md shadow-amber-{curdt.month() == mdi? 400 :600} bg-gray-{curdt.month() == mdi ? 700 : 200} text-{curdt.month() == mdi ? 'blue':'black'}-500 hover:bg-gray-200 hover:text-black">{md.slice(0,3)}</button>
        {/each}
      </div>
      <div class="grid grid-cols-7 text-center gap-1 bg-gray-100">
        {#each weekDayNames as wd}
        <div class="bg-blue-800 text-gray-200">{wd}</div>
        {/each}
      </div>
      <div class="grid grid-cols-7 text-center gap-1 bg-gray-100">
        {#each calcDays(mo,yr) as d}
        <button on:click={() => setDate(d)} class="cursor-pointer rounded-md p-4 py-8 shadow-md text-{d==curdt.date()?'2xl':'md'} text-blue-{d==curdt.date()?400:600} shadow-gray-300">{d}</button>
        {/each}
      </div>
    </div>
  </div>
</div>