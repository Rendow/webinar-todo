import { produce } from 'immer';

//types
export interface TodoItem {
  id: string;
  title: string;
  details?: string;
  done: boolean;
}

export interface TodoItemsState {
  todoItems: TodoItem[];
}

export type TodoItemsAction =
  | ReturnType<typeof sortAC>
  | ReturnType<typeof loadStateAC>
  | ReturnType<typeof dragAndDropAC>
  | ReturnType<typeof addTodoAC>
  | ReturnType<typeof deleteTodoAC>
  | ReturnType<typeof toggleDoneAC>
  | ReturnType<typeof updateTaskAC>;

// actions
export const loadStateAC = (data: TodoItemsState) =>
  ({ type: 'TODO/LOAD-STATE', data } as const);
export const addTodoAC = (data: { title: string; details?: string }) =>
  ({ type: 'TODO/ADD-TODO', data } as const);
export const deleteTodoAC = (data: { id: string }) =>
  ({ type: 'TODO/DELETE-TODO', data } as const);
export const toggleDoneAC = (data: { id: string }) =>
  ({ type: 'TODO/TOGGLE-DONE-TODO', data } as const);
export const dragAndDropAC = (data: { source: number; destination: number }) =>
  ({
    type: 'TODO/DRAG-AND-DROP',
    data,
  } as const);
export const sortAC = () => ({ type: 'TODO/SORT' } as const);
export const updateTaskAC = (data: { id: string; title: string }) =>
  ({ type: 'TODO/UPDATE-TASK', data } as const);

export function todoReducer(
  state: TodoItemsState,
  action: TodoItemsAction,
): TodoItemsState {
  switch (action.type) {
    case 'TODO/LOAD-STATE': {
      return action.data;
    }

    case 'TODO/ADD-TODO':
      return produce(state, draft => {
        draft.todoItems.unshift({ id: generateId(), done: false, ...action.data });
      });

    case 'TODO/DELETE-TODO':
      return produce(state, draft => {
        draft.todoItems = draft.todoItems.filter(({ id }) => id !== action.data.id);
      });

    case 'TODO/TOGGLE-DONE-TODO': {
      const itemIndex = state.todoItems.findIndex(({ id }) => id === action.data.id);
      return produce(state, draft => {
        draft.todoItems[itemIndex].done = !draft.todoItems[itemIndex].done;
      });
    }

    case 'TODO/DRAG-AND-DROP':
      const { source, destination } = action.data;
      return produce(state, draft => {
        const todo = draft.todoItems.splice(source, 1);
        draft.todoItems.splice(destination, 0, ...todo);
      });

    case 'TODO/SORT':
      return produce(state, draft => {
        draft.todoItems.sort((a, b) => {
          return a.done === b.done ? 0 : a.done ? 1 : -1;
        });
      });
    case 'TODO/UPDATE-TASK': {
      const itemIndex = state.todoItems.findIndex(({ id }) => id === action.data.id);
      return produce(state, draft => {
        draft.todoItems[itemIndex].title = action.data.title;
      });
    }
    default:
      throw new Error();
  }
}

function generateId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e16).toString(36)}`;
}
