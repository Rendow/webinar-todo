
//types
export interface TodoItem {
    id: string;
    title: string;
    details?: string;
    done: boolean;
}

export interface TodoItemsState {
    todoItems: TodoItem[]
}

export type TodoItemsAction = ReturnType<typeof loadStateAC> | ReturnType<typeof dragAndDropAC> | ReturnType<typeof addTodoAC> | ReturnType<typeof deleteTodoAC> | ReturnType<typeof toggleDoneAC>

// actions
export const loadStateAC = (data: TodoItemsState) => ({type: 'TODO/LOAD-STATE', data} as const)
export const addTodoAC = (data: { title: string; details?: string}) => ({type: 'TODO/ADD-TODO', data} as const)
export const deleteTodoAC = (data: { id: string}) => ({type: 'TODO/DELETE-TODO', data} as const)
export const toggleDoneAC = (data: { id: string}) => ({type: 'TODO/TOGGLE-DONE-TODO', data} as const)
export const dragAndDropAC = (data: { source:number, destination:number}) => ({type: 'TODO/DRAG-AND-DROP', data} as const)



export function todoReducer(state: TodoItemsState, action: TodoItemsAction) {
    switch (action.type) {
        case 'TODO/LOAD-STATE': {
            return action.data;
        }
        case 'TODO/ADD-TODO':
            return {
                ...state,
                todoItems: [
                    { id: generateId(), done: false, ...action.data },
                    ...state.todoItems,
                ],
            };
        case 'TODO/DELETE-TODO':
            return {
                ...state,
                todoItems: state.todoItems.filter(
                    ({ id }) => id !== action.data.id,
                ),
            };
        case 'TODO/TOGGLE-DONE-TODO': {
            const itemIndex = state.todoItems.findIndex(
                ({id}) => id === action.data.id,
            );
            const item = state.todoItems[itemIndex];
            return {
                ...state,
                todoItems: [
                    ...state.todoItems.slice(0, itemIndex),
                    {...item, done: !item.done},
                    ...state.todoItems.slice(itemIndex + 1),

                ],
            };
        }

        case 'TODO/DRAG-AND-DROP':
            const {source, destination} = action.data

            const stateCopy = {...state};
            const todoList = stateCopy.todoItems
            const todo = stateCopy.todoItems.splice(source, 1);
            todoList.splice(destination, 0, ...todo)

            return stateCopy

        default:
            throw new Error()
    }
}

function generateId() {
    return `${Date.now().toString(36)}-${Math.floor(
        Math.random() * 1e16,
    ).toString(36)}`;
}

