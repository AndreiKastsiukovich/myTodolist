import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {ButtonInput} from "./ButtonInput";
import {EditModeForm} from "./EditModeForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoID:string
    title: string
    state: Array<TaskType>
    removeTask: (taskId: string,todoID:string) => void
    changeFilter: (value: FilterValuesType,todoID:string) => void
    addTask: (title: string,todoID:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoID:string) => void
    filter: FilterValuesType
    deleteTodolist: (todoID:string)=>void
    changeSpanInput:(taskId: string, newTitle:string,todoID:string) => void
    changeTitleTodo:(newTitle:string,todoID:string) => void
}

export function Todolist(props: PropsType) {

    const onClickDelTodolistHandler = () => {
        props.deleteTodolist(props.todoID)
    }
    const onAllClickHandler = () => props.changeFilter("all",props.todoID);
    const onActiveClickHandler = () => props.changeFilter("active",props.todoID);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.todoID);
    const addTasks = (title:string) => {
        props.addTask(title,props.todoID)
    }
    const changeTodoTitle = (newTitle:string) => {
        props.changeTitleTodo(newTitle,props.todoID)
    }

    return <div>

        <button onClick={onClickDelTodolistHandler}> Del </button>
        <h3>
            <EditModeForm title={props.title} callBack={changeTodoTitle}/>
        </h3>

        <ButtonInput buttonName={'Add Task'} callBack={addTasks}/>

        <ul>
            {
                props.state.map(t => {

                    const changeSpan = (newTitle:string) => {
                        props.changeSpanInput(t.id,newTitle,props.todoID)
                    }

                    const onClickHandler = () => props.removeTask(t.id,props.todoID)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked,props.todoID);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>

                        <EditModeForm title={t.title} callBack={changeSpan}/>

                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
