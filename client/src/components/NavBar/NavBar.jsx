import {
	AppBar,
	Typography,
	Toolbar,
	Button,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const NavBar = () => {
	const classes = useStyles();
	const history = useHistory();
	const state = useSelector((state) => state);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		dispatch(signOut());
		history.push('/signin');
	};
	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h4' className={classes.root}>
					<Link to='/' className={classes.linkStyle}>
						To Do App:
					</Link>
				</Typography>
				{auth._id ? (
					<>
						<Typography
							variant='subtitle2'
							className={classes.root}
						>
							Logged in as {auth.name}
						</Typography>
						<Button
							onClick={() => handleSignOut()}
							color='inherit'
						>
							SignOut
						</Button>
					</>
				) : (
					<>
						<Button color='inherit'>
							<Link
								className={classes.linkStyle}
								to='/signin'
							>
								SignIn
							</Link>
						</Button>
						<Button color='inherit'>
							<Link
								className={classes.linkStyle}
								to='/signup'
							>
								SignUp
							</Link>
						</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
