<script>
  import {todos} from "../../stores";
  let todotext = '';

  const addTodo = () => {
    $todos = [...$todos, todotext];
    todotext = '';
  }
  const clearTodos = () => {
    if (confirm("Do you really want to remove all todos?")) {
      $todos = [];
    }
  }
  const removeTodo = (idx) => {
    $todos = [...$todos.slice(0,idx), ...$todos.slice(idx+1)];
  }
</script>
<div class="md:w-1/3">
  <div class="text-3xl border-b-4">Store Demo</div>
  <div class="my-4">
    {$todos.length} todos | <button on:click={clearTodos} class="p-1 bg-red-300 rounded-md">Clear todos</button>
  </div>
  <div class="my-4 p-4 hover:bg-gray-100 shadow-md ">
    Enter Todo: 
    <input type="search" class="px-4 border border-gray-600 rounded-md p-1" 
      placeholder="enter todo text..."
      bind:value={todotext} />
    <button class="p-1 px-2 rounded-md bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={todotext.length < 3}
      on:click={addTodo}
    >Add</button>
  </div>
  <div class="p-4 flex flex-col gap-1 shadow-md shadow-blue-300">
    {#each $todos as todo, idx}
    <div class="flex items-center gap-1 my-1">
      <button on:click={() => removeTodo(idx)} class="p-1 px-2 bg-gray-200 rounded-md">&times;</button> {todo}
    </div>
    {:else}
      * No todos *
    {/each}
  </div>
</div>