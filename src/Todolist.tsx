import React, {ChangeEvent, useState} from 'react';
import {ButtonNameType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (id:number)=>void
    filterTasks: (buttonName:ButtonNameType)=>void
    addTaskFunction:(title:string)=>void
}

export function Todolist(props: PropsType) {


    const onClickHandlerName = (buttonName:ButtonNameType) => {
        props.filterTasks(buttonName)
    }

    const[title,SetTitle] = useState('')

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        SetTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        props.addTaskFunction(title)
        SetTitle('')
    }

    const removeTaskMap = props.tasks.map((el)=>{

        const deletedTasks = () => {
            props.removeTasks(el.id)
        }

        return(

            <li>
                <button onClick={deletedTasks}> X </button>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </li>
        )
    })


    return <div>
        <h3>{props.title}</h3>
        <div>

            <input value={title} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>+</button>

        </div>
        <ul>
            {removeTaskMap}
        </ul>
        <div>
            <button onClick={()=>onClickHandlerName('All')}>All</button>
            <button onClick={()=>onClickHandlerName('Active')}>Active</button>
            <button onClick={()=>onClickHandlerName('Completed')}>Completed</button>
        </div>
    </div>
}
