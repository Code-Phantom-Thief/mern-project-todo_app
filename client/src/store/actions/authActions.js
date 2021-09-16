import axios from 'axios';
import { url } from '../../api';
import { toast } from 'react-toastify';

export const signUp = (user) => async (dispatch) => {
	try {
		const { data } = await axios.post(
			`${url}/signup`,
			user
		);
		localStorage.setItem('token', data);
		dispatch({ type: 'SIGN_UP', data });
	} catch (error) {
		console.log(error.response.data.message);
		toast.error(error.response.data?.message, {
			position: toast.POSITION.BOTTOM_RIGHT,
		});
	}
};

export const signIn = (credentials) => async (dispatch) => {
	try {
		const { data } = await axios.post(
			`${url}/signin`,
			credentials
		);
		localStorage.setItem('token', data);
		dispatch({ type: 'SIGN_IN', data });
	} catch (error) {
		console.log(error.response.data.message);
		toast.error(error.response.data?.message, {
			position: toast.POSITION.BOTTOM_RIGHT,
		});
	}
};

export const loadUser =
	() => async (dispatch, getState) => {
		try {
			const token = getState().auth.token;
			if (token) {
				dispatch({ type: 'USER_LOADED', token });
			} else {
				return null;
			}
		} catch (error) {
			console.log(error.message);
		}
	};

export const signOut = () => async (dispatch) => {
		try {
			dispatch({type: 'SIGN_OUT'})
		} catch (error) {
			console.log(error.message);
		}
	}
