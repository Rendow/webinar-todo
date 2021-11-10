import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import {loadStateAC, TodoItemsAction, todoReducer, TodoItemsState} from "./todo-reducer";


const TodoItemsContext = createContext<
    (TodoItemsState & { dispatch: (action: TodoItemsAction) => void }) | null
>(null);

const defaultState = { todoItems: [] };
const localStorageKey = 'todoListState';


export const TodoItemsContextProvider = ({
    children,
}: {
    children?: ReactNode;
}) => {
    const [state, dispatch] = useReducer(todoReducer, defaultState);

    useEffect(() => {
        const savedState = localStorage.getItem(localStorageKey);

        if (savedState) {
            try {
                dispatch(loadStateAC(JSON.parse(savedState)));
            } catch {}
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
    }, [state]);

    return (
        <TodoItemsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TodoItemsContext.Provider>
    );
};

export const useTodoItems = () => {
    const todoItemsContext = useContext(TodoItemsContext);

    if (!todoItemsContext) {
        throw new Error(
            'useTodoItems hook should only be used inside TodoItemsContextProvider',
        );
    }

    return todoItemsContext;
};

