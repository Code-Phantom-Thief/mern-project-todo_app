import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		color: '#fafafa',
	},
	linkStyle: {
		color: '#fafafa',
		textDecoration: 'none',
		'&:hover': {
			color: '#fafafa',
			textDecoration: 'none',
		},
	},
});
