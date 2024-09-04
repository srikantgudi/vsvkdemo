<svelte:head>
  <title>SvelteKit Demo App</title>
</svelte:head>
<script>
  import "../app.css";

</script>

<main class="md:w-5/6 mx-auto">
  <nav class="h-16 bg-gradient-to-t from-slate-600 to-cyan-300 flex gap-1 items-center bg-blue-300 shadow-md p-1 px-4">
    <div class="md:text-4xl transition-all text-2xl text-gray-200 w-1/2"><a href="/">SvelteKit Demo App</a></div>
    <div class="md:text-lg flex md:flex-row rounded-md flex-col md:h-auto p-2 h-8 md:bg-black bg-gray-300 shadow-md hover:h-auto overflow-y-auto md:sticky absolute top-1 right-1 gap-2 px-2">
      <a class="bg-gray-200 px-2" href="/">Home</a>
      <a class="bg-gray-200 px-2" href="/calendars">Calendars</a>
      <a class="bg-gray-200 px-2" href="/clocks">Clocks</a>
      <a class="bg-gray-200 px-2" href="/storedemo">Store</a>
      <a class="bg-gray-200 px-2" href="/dynamicdata">Dynamic-data</a>
    </div>
  </nav>
  <div class="p-4 transition-all delay-1000">
    <slot />
  </div>
</main>