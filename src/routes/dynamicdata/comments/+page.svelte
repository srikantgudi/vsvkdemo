<script>
  import {onMount} from 'svelte';
  let data = [];
  let isLoading = false;
  onMount(async () => {
    isLoading = true;
    const resp = await fetch('/api/comments');
    if (resp.ok) {
      setTimeout(async () => {
        data = await resp.json();
        isLoading = false;
      }, 500);
    }
  })
</script>
<div>
  <div class="py-4 px-12 text-2xl bg-gray-200">Comments</div>
  <div class="mt-12 p-12 rounded-md shadow-lg {isLoading ? 'visible' : 'hidden'} text-center text-3xl">
    Fetching data..
  </div>
  <div class="px-12 h-[60vh] overflow-y-auto {isLoading ? 'hidden' : 'visible'}">
    <table>
      <thead class="sticky top-1 bg-gray-700 text-blue-300">
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Body</td>
        </tr>
      </thead>
      <tbody>
        {#each data as row}
        <tr>
          <td>{row.name}</td>
          <td>{row.email}</td>
          <td>{row.body}</td>
        </tr>
        {/each}
      </tbody>
  </div>
</div>