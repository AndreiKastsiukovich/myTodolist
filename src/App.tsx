import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {ButtonInput} from "./ButtonInput";

export type FilterValuesType = "all" | "active" | "completed"

export type StateType = {
    [key:string]: TaskType[]
}

export type TodolistType = {
    id:string,
    title:string,
    filter:FilterValuesType
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoList,setTodolist] = useState<TodolistType[]>([
        {id:todoListId1, title:'Where to going?', filter:'all'},
        {id:todoListId2, title:'Where to buy?', filter:'all'}
    ])

    let [state, setState] = useState<StateType>({
        [todoListId1]:[
            {id:v1(),title:'Karelia',isDone:false},
            {id:v1(),title:'Murmansk',isDone:true},
            {id:v1(),title:'Altay',isDone:false},
            {id:v1(),title:'Georgia',isDone:true},
        ],

        [todoListId2]:[
            {id:v1(),title:'Bread',isDone:false},
            {id:v1(),title:'Water',isDone:true},
            {id:v1(),title:'Potato',isDone:false},
        ],
    })

    const deleteTodolist = (todoID:string) => {
        setTodolist(todoList.filter((el)=>el.id !== todoID))
        delete state[todoID]
        setState({...state})
    }

    function removeTask(id: string,todoID:string) {
        setState({...state,[todoID]:state[todoID].filter((el)=>el.id !== id)})
    }


    function addTask(title: string,todoID:string) {
        let newTasks = {id:v1(),title:title,isDone:true}
        setState({...state,[todoID]:[...state[todoID],newTasks]})
    }

    function changeStatus(taskId: string, isDone: boolean,todoID:string) {
        setState({...state,[todoID]:state[todoID].map((el)=>el.id === taskId ? {...el,isDone:isDone} : el)})
    }


    function changeFilter(value: FilterValuesType,todoID:string) {
        setTodolist(todoList.map((el)=> el.id === todoID ? {...el, filter:value} : el))
    }

    const changeSpanInput = (taskId: string, newTitle:string,todoID:string) => {
        setState({...state,[todoID]:state[todoID].map((el)=>el.id === taskId ? {...el,title:newTitle}:el)})
    }

    const changeTitleTodo = (newTitle:string,todoID:string) => {
        setTodolist(todoList.map((el)=>el.id === todoID ? {...el,title:newTitle} : el))
    }

    const addTodolist = (title:string) => {
        const newTodolistId = v1()
        const newTodolist:TodolistType = {id:newTodolistId, title:title, filter:'all'};
        setTodolist([...todoList,newTodolist])
        setState({...state,[newTodolist.id]:[]})
    }

    return (
        <div className="App">

            <ButtonInput buttonName={'Add Todo'} callBack={addTodolist}/>

            {todoList.map((el)=>{

                let tasksForTodolist = state[el.id]

                if(el.filter === "completed")
                    tasksForTodolist = state[el.id].filter((el)=>el.isDone)
                if(el.filter === "active")
                    tasksForTodolist = state[el.id].filter((el)=>!el.isDone)

                return(
                    <Todolist
                        key={el.id}
                        todoID={el.id}
                        title={el.title}
                        state={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        deleteTodolist={deleteTodolist}
                        changeSpanInput={changeSpanInput}
                        changeTitleTodo={changeTitleTodo}
                    />
                )
            })}

        </div>
    );
}

export default App;
