<script>
  import {onMount} from 'svelte';
  let data = [];
  onMount(async () => {
    const resp = await fetch('/api/posts');
    data = await resp.json();
  })
</script>
<div class="text-2xl">Posts</div>
<div class="h-[60vh] overflow-y-auto">
  <table>
    <thead class="sticky top-1 bg-gray-700 text-blue-300">
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