import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

const initialState = {
	token: localStorage.getItem('token'),
	name: null,
	email: null,
	_id: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SIGN_UP':
		case 'SIGN_IN':
		case 'USER_LOADED':
			toast('Welcome...', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			const user = jwt_decode(action.data);
			return {
				...initialState,
				token: action.data,
				name: user.name,
				email: user.email,
				_id: user._id,
			};
		case 'SIGN_OUT':
			localStorage.removeItem('token');
			toast('Goodbye...', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			return {
				token: null,
				name: null,
				email: null,
				_id: null,
			};
		default:
			return state;
	}
};

export default authReducer;
