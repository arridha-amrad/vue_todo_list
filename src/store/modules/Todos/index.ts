import { Todo } from "../../../types/Todo";
import { nanoid } from "nanoid";
import { Module } from "vuex";
import { RootState } from "../..";

export interface TodoState {
  todos: Todo[];
  todo: null | Todo;
}

const getTodosFromLS = () => {
  const todos = localStorage.getItem("todos");
  let myTodos: Todo[] = [];
  if (todos) {
    myTodos = JSON.parse(todos);
  }
  return myTodos;
};

const ModuleOfTodo: Module<TodoState, RootState> = {
  namespaced: true,
  state: {
    todos: [],
    todo: null,
  },
  mutations: {
    updateTodo(state, { id, title }: { id: string; title: string }) {
      const todosCopy = [...state.todos];
      const index = todosCopy.findIndex((todo) => todo.id === id);
      todosCopy[index].title = title;
      state.todos = todosCopy;
      localStorage.setItem("todos", JSON.stringify(todosCopy));
    },
    addTodo(state, title: string): void {
      const newTodo: Todo = {
        id: nanoid(4),
        createdAt: new Date(),
        isComplete: false,
        level: "normal",
        title,
        updatedAt: new Date(),
      };
      state.todos.splice(0, 0, newTodo);
      const myTodos = getTodosFromLS();
      const updatedMyTodos = [...myTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedMyTodos));
    },
    deleteTodo(state, id: string): void {
      state.todos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    setComplete(state, id: string): void {
      const index = state.todos.findIndex((todo) => todo.id === id);
      const todosCopy = [...state.todos];
      todosCopy[index].isComplete = true;
      state.todos = todosCopy;
      localStorage.setItem("todos", JSON.stringify(todosCopy));
    },
    toggleIsEdit(state, id: string): void {
      const todosCopy = [...state.todos];
      const index = state.todos.findIndex((todo) => todo.id === id);
      const isEdit = todosCopy[index].isEdit;
      todosCopy[index].isEdit = !isEdit;
      state.todos = todosCopy;
      localStorage.setItem("todos", JSON.stringify(todosCopy));
    },
  },
  getters: {
    getTodos(state): Todo[] {
      const myTodos = localStorage.getItem("todos");
      if (myTodos) {
        state.todos = JSON.parse(myTodos);
      }
      return state.todos.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    },
  },
  actions: {
    addTodo({ commit }, title: string): void {
      commit("addTodo", title);
    },
    deleteTodo({ commit }, id: string): void {
      commit("deleteTodo", id);
    },
    setComplete({ commit }, id: string): void {
      commit("setComplete", id);
    },
    toggleIsEdit({ commit }, id: string): void {
      commit("toggleIsEdit", id);
    },
    updateTodo({ commit }, { id, title }: { id: string; title: string }) {
      commit("updateTodo", { id, title });
      commit("toggleIsEdit", id);
    },
  },
};

export default ModuleOfTodo;
