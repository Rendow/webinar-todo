import { useTodoItems } from '../TodoItemsContext/TodoItemsContext';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { addTodoAC } from '../TodoItemsContext/todo-reducer';

const useInputStyles = makeStyles(() => ({
  root: {
    marginBottom: 24,
  },
}));

export default function TodoItemForm() {
  const classes = useInputStyles();
  const { dispatch } = useTodoItems();
  const { control, handleSubmit, reset, watch } = useForm();

  return (
    <form
      onSubmit={handleSubmit((formData: { title: string; details?: string }) => {
        dispatch(addTodoAC(formData));
        reset({ title: '', details: '' });
      })}
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <TextField {...field} label="TODO" fullWidth={true} className={classes.root} />
        )}
      />
      <Controller
        name="details"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Details"
            fullWidth={true}
            multiline={true}
            className={classes.root}
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!watch('title')}
      >
        Add
      </Button>
    </form>
  );
}
