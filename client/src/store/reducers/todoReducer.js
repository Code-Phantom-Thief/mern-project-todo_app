import { toast } from 'react-toastify';

export const todoReducer = (todos = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			toast.success('A todo was added...', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			return [action.todo, ...todos];
		case 'GET_TODOS':
			return action.todos;
		case 'UPDATE_TODO':
			toast.success('A todo was updated...', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			return todos.map((todo) =>
				todo._id === action.todo._id ? action.todo : todo
			);
		case 'CHECK_TODO':
			toast.success('A todo status was changed...', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			return todos.map((todo) =>
				todo._id === action.todo._id ? action.todo : todo
			);
		case 'DELETE_TODO':
			toast.success('A todo was deleted...', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			return todos.filter((todo) =>
				todo._id !== action.id
			);
		default:
			return todos;
	}
};
