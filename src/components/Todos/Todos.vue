<template>
  <div class="container">
    <div class="d-flex align-items-end">
      <div class="flex-grow-1 d-flex flex-column align-items-start">
        <label class="fw-bolder">Title</label>
        <input
          v-model="title"
          class="form-control"
          type="text"
          placeholder="title"
        />
      </div>
      <div>
        <button @click="addTodo()" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <div v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../../store";
import { Todo } from "../../types/Todo";
import TodoItem from "./TodoItem.vue";
export default defineComponent({
  name: "Todos",
  components: { TodoItem },
  mounted() {
    const store = useStore();
    store.getters["todos/getTodos"];
  },
  setup() {
    const title = ref("");
    const store = useStore();
    const { dispatch, state } = store;
    const addTodo = () => {
      dispatch("todos/addTodo", title.value);
      title.value = "";
    };
    const todos = computed<Todo[]>(() => state.todos.todos);
    return { addTodo, todos, title };
  },
});
</script>
