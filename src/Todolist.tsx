import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterNameType} from "./App";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks:(id:number)=>void
    filterTasks:(filter:FilterNameType)=>void
    addTask:(text:string)=>void
    changeCheckBox:(taskId:number,status:boolean)=>void
    filterName:(FilterNameType)
}


export const Todolist: React.FC<PropsType> = (props) => {
    const {title, tasks,removeTasks,filterTasks,addTask,filterName} = props

    const[text,SetTitle] = useState<string>('')

    const [error,SetError] = useState<string>('')

    const onClickDelTask = (id:number) => {
        removeTasks(id)
    }

    const onClickFilterHandler = (filter:FilterNameType) => {
        filterTasks(filter)
    }

    const onChangInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        SetTitle(event.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        if(text.trim() !== ''){
            addTask(text.trim())
            SetTitle('')
        }else{
            SetError('Error Add text!')
        }

    }

    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        SetError('')
        if(event.key === 'Enter'){
            onClickAddTaskHandler()
        }
    }

    const mappedTask = tasks.map((el) => {

        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeCheckBox(el.id, event.currentTarget.checked)
        }
        return (
            <ul className={el.isDone?'task-done':''}>
                <li key={el.id}>

                    <button onClick={() => onClickDelTask(el.id)}>DEL</button>
                    <input type='checkbox' checked={el.isDone} onChange={onChangeStatusHandler}/>
                    <span>{el.title}</span>

                </li>
            </ul>
        )
    })

    return <div>
        <h3>{title}</h3>
        <div>
            <input className={error ? 'input-error': ''}
                   value={text}
                   onChange={onChangInputHandler}
                   onKeyPress={onKeyPressHandler}
            />

            <button onClick={onClickAddTaskHandler}>+</button>

            {error && <div className={'input-text-error'}>{error}</div>}

        </div>
        {mappedTask}
        <div>
            <button className={filterName === 'all'? 'active-filter':'default-filter'} onClick={() => onClickFilterHandler('all')}>All</button>
            <button className={filterName === 'active'?'active-filter':'default-filter'} onClick={() => onClickFilterHandler('active')}>Active</button>
            <button className={filterName === 'completed' ? 'active-filter':'default-filter'} onClick={() => onClickFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}
