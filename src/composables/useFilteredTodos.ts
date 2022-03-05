import { computed, Ref, ref } from "vue";
import { Todo } from "./useTodos";

export default function useFilteredTodos(todos:Ref<Todo[]>) {
  const filter = ref("all");

  // 过滤 todo
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "done":
        return todos.value.filter((todo:Todo) => todo.completed);
      case "todo":
        return todos.value.filter((todo:Todo) => !todo.completed);
      default:
        return todos.value;
    }
  });

  return { filter, filteredTodos };
}
