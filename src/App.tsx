import React, {useState} from 'react';
import './App.css';
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button, Checkbox,
    Container, createTheme, CssBaseline, FormControlLabel, FormGroup, Grid,
    IconButton, Paper, ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {lightGreen, orange} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./reducers/store";
import {
    addTodolistAC,
    changeTodoListFilterAC, changeTodoListTitleAC,
    FilterType,
    removeTodoListAC,
    TodolistType
} from "./reducers/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskStateType,
    TaskType
} from "./reducers/task-reducer";
import TodoList from "./TodoList";



function App (): JSX.Element {
    //BLL:

    const todoLists = useSelector<RootStateType,TodolistType[]>(state => state.todoLists)
    const tasks = useSelector<RootStateType,TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId,todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title,todoListId))
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId,newIsDone,todoListId))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId,newTitle,todoListId))
    }


    const removeTodoList = (todoListId: string)=> {
        dispatch(removeTodoListAC(todoListId))

    }

    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeTodoListFilter = (filter: FilterType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(filter,todoListId))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(title,todoListId))
    }


    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterType):  Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }


    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl
            .filter)
        return (
            <Grid item>
                <Paper sx={{p: "20px"}} elevation={8}>
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tl.filter}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}

                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    //UI:
    const mode = isDarkMode ?  "dark" : "light"
    const newTheme = createTheme({
        palette: {
            mode: mode,
            primary:  lightGreen,
            secondary: orange,
        }
    })
    return (
        <ThemeProvider theme={newTheme}>
            <CssBaseline />
                <div className="App">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                TodoLists
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={(e)=>setDarkMode(e.currentTarget.checked)} />}
                                    label={isDarkMode ? "Light mode" : "Dark mode"}
                                />
                            </FormGroup>

                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Container fixed>
                        <Grid container sx={{p: "15px 0"}}>
                            <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList} />

                        </Grid>
                        <Grid container spacing={3}>
                            {todoListsComponents}
                        </Grid>
                    </Container>
                </div>
        </ThemeProvider>
    );
}

export default App;
