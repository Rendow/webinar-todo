import React, {useCallback} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import {motion} from 'framer-motion';
import {useTodoItems} from '../TodoItemsContext/TodoItemsContext';
import {deleteTodoAC, dragAndDropAC, sortAC, TodoItem, toggleDoneAC} from "../TodoItemsContext/todo-reducer";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    Droppable,
    DroppableProvided,
    DropResult,
    ResponderProvided
} from 'react-beautiful-dnd';

const spring = {
    type: 'spring',
    damping: 25,
    stiffness: 120,
    duration: 0.25,
};

const useTodoItemListStyles = makeStyles({
    root: {
        listStyle: 'none',
        padding: '20px 0',
    },
});


export const TodoItemsList = function () {
    const {todoItems} = useTodoItems();
    const {dispatch} = useTodoItems();

    const classes = useTodoItemListStyles();

    const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
        const {destination, source} = result
        if (!destination) return;
        if (destination.index === source.index && destination.droppableId === source.droppableId) return;

        dispatch(dragAndDropAC({source: source.index, destination: destination.index}))
    }
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todo" direction="vertical">
                {(providedDroppable: DroppableProvided) => (
                    <ul className={classes.root}
                        ref={providedDroppable.innerRef}  {...providedDroppable.droppableProps}>

                        {todoItems.map((item, index) => (
                            <motion.li key={item.id} transition={spring}
                               // layout={true}
                            >
                                <TodoItemCard index={index} item={item}/>
                            </motion.li>))}
                        {providedDroppable.placeholder}

                    </ul>)}
            </Droppable>
        </DragDropContext>
    );
};

const useTodoItemCardStyles = makeStyles({
    root: {
        marginTop: 24,
        marginBottom: 24,
    },
    doneRoot: {
        textDecoration: 'line-through',
        color: '#888888',
    },
});

export const TodoItemCard = function ({item, index}: { item: TodoItem, index: number }) {
    const classes = useTodoItemCardStyles();
    const {dispatch} = useTodoItems();

    const handleDelete = useCallback(
        () => dispatch(deleteTodoAC({id: item.id})),
        [item.id, dispatch],
    );

    const handleToggleDone = useCallback(
        () => {
            dispatch(toggleDoneAC({id: item.id}));
            dispatch(sortAC())
        }, [item.id, dispatch]);

    return (
        <Draggable //isDragDisabled={item.done}
            draggableId={item.id} index={index}>
            {(provided: DraggableProvided) => (

                <Card
                    className={classnames(classes.root, {[classes.doneRoot]: item.done,})}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                    <CardHeader
                        action={
                            <IconButton aria-label="delete" onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        }
                        title={
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={item.done}
                                        onChange={handleToggleDone}
                                        name={`checked-${item.id}`}
                                        color="primary"
                                    />
                                }
                                label={item.title}
                            />
                        }
                    />
                    {item.details ? (
                        <CardContent>
                            <Typography variant="body2" component="p">
                                {item.details}
                            </Typography>
                        </CardContent>
                    ) : null}
                </Card>
            )}

        </Draggable>
    );
};
