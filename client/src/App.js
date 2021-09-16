import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import Todos from './components/Todos/Todos';
import SignIn from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
import NavBar from './components/NavBar/NavBar';
import { Container, makeStyles } from '@material-ui/core';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {loadUser} from './store/actions/authActions'

const useStyles = makeStyles({
	contentStyle: {
		margin: '30px auto',
	},
});

function App() {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser())
	}, [dispatch]);
	return (
		<BrowserRouter>
			<ToastContainer />
			<Container maxWidth='md'>
				<NavBar />
				<Container
					className={classes.contentStyle}
					maxWidth='sm'
				>
					<Switch>
						<Route path='/signin' component={SignIn} />
						<Route path='/signup' component={SignUp} />
						<Route exact path='/' component={Todos} />
					</Switch>
				</Container>
			</Container>
		</BrowserRouter>
	);
}

export default App;
