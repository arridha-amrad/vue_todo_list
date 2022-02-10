import { InjectionKey } from "vue";
import {
  createStore,
  Store,
  useStore as baseUseStore,
  createLogger,
} from "vuex";
import ModuleOfTodo, { TodoState } from "./modules/Todos";

export interface RootState {
  todos: TodoState;
}

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    todos: ModuleOfTodo,
  },
  plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
});

export function useStore(): Store<RootState> {
  return baseUseStore(key);
}
