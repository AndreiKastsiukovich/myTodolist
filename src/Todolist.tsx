import React from 'react';
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
}

export function Todolist(props: PropsType) {

    const onClickAll = () => {
        props.filterTasks('All')
    }

    const onClickActive = () => {
        props.filterTasks('Active')
    }

    const onClickCompleted = () => {
        props.filterTasks('Completed')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((el)=>{

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
            })}
        </ul>
        <div>
            <button onClick={onClickAll}>All</button>
            <button onClick={onClickActive}>Active</button>
            <button onClick={onClickCompleted}>Completed</button>
        </div>
    </div>
}
