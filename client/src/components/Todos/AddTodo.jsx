import {
	TextField,
	Button,
	makeStyles,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {addTodo, updateTodo} from '../../store/actions/todoActions'

const useStyles = makeStyles({
	formStyle: {
		margin: '0px auto',
		padding: '30px',
		borderRadius: '9px',
		boxShadow: '0px 0px 12px -3px #000000',
		display: 'flex',
		justifyContent: 'space-between',
	},
	submitButton: {
		marginLeft: '20px',
	},
});

const AddTodo = ({todo, setTodo}) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (todo._id) {
			const id = todo._id;
			const updatedTodo = {
				name: todo.name,
				isComplete: todo.isComplete,
				author: todo.author,
				uid: todo.uid
			}
			dispatch(updateTodo(updatedTodo,id))
		} else {
			dispatch(addTodo(todo));
		}
		setTodo({
			name: '',
			isComplete: false,
			author: '',
			uid: ''
		});
	}
	return (
		<>
			<form
				className={classes.formStyle}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<TextField
					id='enter-todo'
					label='enterToDo'
					variant='outlined'
					autoFocus
					fullWidth
					value={todo.name}
					onChange={(e) => setTodo({...todo, name: e.target.value})}
				/>
				<Button
					color='primary'
					variant='contained'
					type='submit'
					className={classes.submitButton}
				>
					<Send />
				</Button>
			</form>
		</>
	);
};

export default AddTodo;
