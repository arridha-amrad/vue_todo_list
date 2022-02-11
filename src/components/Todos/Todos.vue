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
      <button
        v-if="title.trim() !== ''"
        @click="addTodo()"
        class="btn btn-primary"
      >
        Submit
      </button>
      <button v-else @click="addTodo()" class="btn btn-primary disabled">
        Submit
      </button>
    </div>
    <div v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "../../store";
import { Todo } from "../../types/Todo";
import TodoItem from "./TodoItem.vue";
export default defineComponent({
  name: "Todos",
  components: { TodoItem },
  setup() {
    const title = ref("");
    const store = useStore();
    const { dispatch, state } = store;
    onMounted(() => {
      store.getters["todos/getTodos"];
    });
    const addTodo = () => {
      dispatch("todos/addTodo", title.value);
      title.value = "";
    };
    const todos = computed<Todo[]>(() => state.todos.todos);

    return { addTodo, todos, title };
  },
});
</script>
