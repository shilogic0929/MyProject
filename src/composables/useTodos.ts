import { onMounted, ref } from "vue";

export interface Todo{
  id:number,
  content:string,
  completed:boolean,
}

export default function useTodos() {
  const todos = ref<Todo[]>([]);

  // 添加 todo
  const addTodo = (todo:Todo) => todos.value.push(todo);

  // 获取远程 todos
  const fetchTodos = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=6"
    );
    const rawTodos = await response.json();
    todos.value = rawTodos.map((todo:any) => ({
      id: todo.id,
      content: todo.title,
      completed: todo.completed,
    }));
  };

  onMounted(() => {
    fetchTodos();
  });

  return {
    todos,
    addTodo,
  };
}
