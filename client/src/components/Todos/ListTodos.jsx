import Todo from './Todo';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import {getTodos} from '../../store/actions/todoActions'

const useStyles = makeStyles({
    todosStyle: {
        margin: "20px auto",
        padding: "20px",
        borderRadius: "9px",
        boxShadow: "0px 0px 12px -3px #000000"
    }
});

const ListTodos = ({setTodo}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    console.log(todos);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch])
    return (
        <>
            <div className={classes.todosStyle}>
                <Typography variant="h5">
                    {todos.length > 0 ? "the Todos": "No Todos Yet"}
                </Typography>
                {todos && todos.map(todo => (
                    <Todo todo={todo} key={todo._id} setTodo={setTodo}/>
                ))}
            </div>
        </>
    )
}

export default ListTodos
