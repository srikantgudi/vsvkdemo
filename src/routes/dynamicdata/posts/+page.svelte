<script>
  import {onMount} from 'svelte';
  let data = [];
  let isLoading = false;
  onMount(async () => {
    isLoading = true;
    const resp = await fetch('/api/posts');
    if (resp.ok) {
      setTimeout(async () => {
        data = await resp.json();
        isLoading = false;
      }, 500);
    }
  })
</script>
<div class="py-4 px-12 text-2xl bg-gray-200">Posts</div>
<!-- {#if isLoading} -->
<div class="mt-12 p-12 rounded-md shadow-lg {isLoading ? 'visible' : 'hidden'} text-center text-3xl">
  Fetching data..
</div>
<!-- {:else} -->
<div class="px-12 h-[60vh] sticky top-0 overflow-y-auto {isLoading ? 'hidden' : 'visible'}">
  <table>
    <thead class="sticky top-0 bg-gray-700 text-blue-300">
      <tr>
        <td>Title</td>
        <td>Description</td>
      </tr>
    </thead>
    <tbody>
      {#each data as row}
      <tr>
        <td>{row.title}</td>
        <td>{row.body}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
<!-- {/if} -->
