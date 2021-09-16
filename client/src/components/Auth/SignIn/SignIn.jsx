import {
	Typography,
	TextField,
	Button,
	makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signIn } from '../../../store/actions/authActions';
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles({
	formStyle: {
		margin: '0px auto',
		padding: '30px',
		borderRadius: '9px',
		boxShadow: '0px 0px 12px -3px #000000',
	},
	spacing: {
		marginTop: '20px',
	},
});

const SignIn = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signIn(credentials))
		setCredentials({
			email: '',
			password: '',
		});
	}
	if(auth._id) return <Redirect to="/" />
	return (
		<>
			<form
				noValidate
				autoComplete='off'
				className={classes.formStyle}
				onSubmit={handleSubmit}
			>
				<Typography variant='h5'>SignIn:</Typography>
				<TextField
					className={classes.spacing}
					id='enter-email'
					label='enterEmail'
					variant='outlined'
					fullWidth
					type='email'
					value={credentials.email}
					onChange={(e) =>
						setCredentials({
							...credentials,
							email: e.target.value,
						})
					}
				/>
				<TextField
					className={classes.spacing}
					id='enter-password'
					label='enterPassword'
					variant='outlined'
					fullWidth
					type='password'
					value={credentials.password}
					onChange={(e) =>
						setCredentials({
							...credentials,
							password: e.target.value,
						})
					}
				/>
				<Button
					className={classes.spacing}
					variant='contained'
					color='primary'
					type='submit'
				>
					SignIn
				</Button>
			</form>
		</>
	);
};

export default SignIn;
