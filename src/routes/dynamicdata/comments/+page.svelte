<script>
  import {onMount} from 'svelte';
  let data = [];
  onMount(async () => {
    const resp = await fetch('/api/comments');
    data = await resp.json();
  })
</script>
<div>
  <div class="text-2xl bg-gray-200">Comments</div>
  <div class="h-[60vh] overflow-y-auto">
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