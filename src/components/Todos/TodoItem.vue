<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="d-flex flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div v-if="todo.isEdit">
            <input
              v-model="title"
              type="text"
              placeholder="todo title"
              class="form-control"
            />
          </div>
          <div v-else>
            <span class="fw-bold">title :</span> {{ todo.title }}
          </div>
          <div v-if="todo.isEdit" class="d-flex gap-2">
            <button
              @click="updateTodo(todo.id, title)"
              class="d-block btn btn-primary"
            >
              Update
            </button>
            <button
              @click="toggleIsEdit(todo.id)"
              class="d-block btn btn-secondary"
            >
              Cancel
            </button>
          </div>
          <div v-else>
            <button
              @click="
                toggleIsEdit(todo.id);
                setTitle(todo.title);
              "
              class="d-block btn btn-outline-primary"
            >
              Change todo title
            </button>
          </div>
        </div>
        <div class="fw-bold">
          status :
          <p class="d-inline fw-normal" v-if="todo.isComplete">Complete</p>
          <p class="d-inline fw-normal" v-else>Not complete</p>
        </div>
        <div class="d-flex gap-2 mt-2">
          <button @click="deleteTodo(todo.id)" class="btn btn-danger">
            Delete
          </button>
          <button
            v-if="!todo.isComplete"
            @click="setComplete(todo.id)"
            class="btn btn-success"
          >
            Complete
          </button>
          <button v-else disabled class="btn btn-success">Complete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useStore } from "../../store";
import { Todo } from "../../types/Todo";
export default defineComponent({
  name: "Todo Item",
  data() {
    return {
      title: "",
    };
  },
  props: {
    todo: {
      required: true,
      type: Object as PropType<Todo>,
    },
  },
  methods: {
    setTitle(title: string) {
      this.title = title;
    },
  },
  setup() {
    const { dispatch } = useStore();
    const deleteTodo = (id: string) => {
      dispatch("todos/deleteTodo", id);
    };
    const setComplete = (id: string) => {
      dispatch("todos/setComplete", id);
    };
    function toggleIsEdit(id: string) {
      dispatch("todos/toggleIsEdit", id);
    }
    function updateTodo(id: string, title: string) {
      dispatch("todos/updateTodo", { id, title });
    }
    return { deleteTodo, setComplete, toggleIsEdit, updateTodo };
  },
});
</script>
