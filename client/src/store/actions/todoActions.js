import axios from 'axios';
import { url, setHeaders } from '../../api';
import { toast } from 'react-toastify';

export const addTodo =
	(newTodo) => async (dispatch, getState) => {
		try {
			const author = getState().auth.name;
			const uid = getState().auth._id;
			const { data } = await axios.post(
				`${url}/todos`,
				{ ...newTodo, author, uid },
				setHeaders()
			);
			dispatch({ type: 'ADD_TODO', todo: data });
		} catch (error) {
			console.log(error.response);
			toast.error(error.response?.data.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	};

export const getTodos = () => async (dispatch) => {
	try {
		const { data } = await axios.get(
			`${url}/todos`,
			setHeaders()
		);
		dispatch({ type: 'GET_TODOS', todos: data });
	} catch (error) {
		console.log(error.response);
	}
};

export const updateTodo =
	(updatedTodo, id) => async (dispatch) => {
		try {
			const { data } = await axios.put(
				`${url}/todos/${id}`,
				updatedTodo,
				setHeaders()
			);
			dispatch({ type: 'UPDATE_TODO', todo: data });
		} catch (error) {
			toast.error(error.response?.data.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	};

export const checkTodo = (id) => async (dispatch) => {
	try {
		const { data } = await axios.patch(
			`${url}/todos/${id}`,
			{},
			setHeaders()
		);
		dispatch({ type: 'CHECK_TODO', todo: data });
	} catch (error) {
		toast.error(error.response?.data.message, {
			position: toast.POSITION.BOTTOM_RIGHT,
		});
	}
};

export const deleteTodo = (id) => async (dispatch) => {
	try {
		await axios.delete(`${url}/todos/${id}`, setHeaders());
		dispatch({ type: 'DELETE_TODO', id });
	} catch (error) {
		toast.error(error.response?.data.message, {
			position: toast.POSITION.BOTTOM_RIGHT,
		});
	}
};
